"use server";

import Stripe from "stripe";
import { PrismaClient, type TopUp } from "@prisma/client";
import { getServerAuthSession } from "./server/auth";
import { type CompletionTokenUsage } from "ai";

export async function updateBalance() {
  // sanity checks
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Stripe secret key not found");
  }

  const stripe = new Stripe(stripeSecretKey);
  const user = session.user;

  if (!user.email) {
    throw new Error("User email not found");
  }

  if (!user.name) {
    throw new Error("User name not found");
  }

  const db = new PrismaClient();

  // make sure the user has a Stripe customer ID
  if (!user.stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: newCustomer.id,
      },
    });

    user.stripeCustomerId = newCustomer.id;
  }

  // sync confirmed top-ups from Stripe
  const unsyncedTopUps = await stripe.checkout.sessions.list({
    limit: 100,
    customer: user.stripeCustomerId,
    status: "complete",
  });

  for (const checkoutSession of unsyncedTopUps.data) {
    const topUp = await db.topUp.findFirst({
      where: { stripeCheckoutSessionId: checkoutSession.id },
    });

    if (!topUp) {
      await db.topUp.create({
        data: {
          stripeCheckoutSessionId: checkoutSession.id,
          user: { connect: { id: user.id } },
          amount: (checkoutSession.amount_total ?? 0) / 100,
        },
      });
    }
  }

  type TopUpWithStripeCheckoutSessionId = TopUp & {
    stripeCheckoutSessionId: string;
  };
  const unconfirmedTopUps = (await db.topUp.findMany({
    where: {
      userId: user.id,
      stripeCheckoutSessionId: { not: null }, // TS doesn't get this
      confirmedAt: null,
    },
  })) as TopUpWithStripeCheckoutSessionId[]; // See: https://github.com/prisma/prisma/discussions/20190

  for (const topUp of unconfirmedTopUps) {
    const session = await stripe.checkout.sessions.retrieve(
      topUp.stripeCheckoutSessionId,
    );

    const amount = (session.amount_total ?? 0) / 100;

    if (session.payment_status === "paid") {
      await db.topUp.update({
        where: { id: topUp.id },
        data: {
          confirmedAt: new Date(),
          amount,
        },
      });
    }
  }

  // calculate balance
  const tokenUsage = await db.tokenUsage.findMany({
    where: { userId: user.id },
  });
  const topUps = await db.topUp.findMany({
    where: { userId: user.id, confirmedAt: { not: null } },
  });

  const totalTokenCost = tokenUsage.reduce((acc, { inputCost, outputCost }) => {
    return acc + inputCost + outputCost;
  }, 0);

  const totalTopUp = topUps.reduce((acc, { amount }) => {
    return acc + (amount ?? 0);
  }, 0);

  const balance = Math.max(totalTopUp - totalTokenCost, 0);

  // update
  await db.user.update({
    where: { id: user.id },
    data: { currentBalance: balance },
  });

  return {
    totalTokenCost,
    totalTopUp,
    balance,
    formattedBalance: balance.toFixed(3),
  };
}

export async function updateTokenUsage(
  usage: CompletionTokenUsage,
  llm: { id: string; priceIn: number; priceOut: number; margin: number },
) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const db = new PrismaClient();

  await db.tokenUsage.create({
    data: {
      input: usage.promptTokens,
      inputCost: usage.promptTokens * llm.priceIn * (1 + llm.margin / 100),
      output: usage.completionTokens,
      outputCost:
        usage.completionTokens * llm.priceOut * (1 + llm.margin / 100),
      llm: { connect: { id: llm.id } },
      user: { connect: { id: session.user.id } },
    },
  });
}
