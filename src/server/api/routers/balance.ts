import { type TopUp } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { tokenPrices } from "~/server/tokenPrices";

export const balanceRouter = createTRPCRouter({
  createTopUp: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.session.user;

    if (!user.stripeCustomerId) {
      throw new Error("User has no Stripe ID");
    }

    const priceId = process.env.STRIPE_TOPUP_PRICE_ID;
    if (!priceId) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Stripe top-up price ID not found",
      });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Stripe secret key not found",
      });
    }
    const stripe = new Stripe(stripeSecretKey);

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/assistants",
    });

    await ctx.db.topUp.create({
      data: {
        stripeCheckoutSessionId: checkoutSession.id,
        user: { connect: { id: user.id } },
      },
    });

    if (!checkoutSession.url) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Stripe checkout session URL not found",
      });
    }

    return checkoutSession.url;
  }),
  update: protectedProcedure.mutation(async ({ ctx }) => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Stripe secret key not found",
      });
    }

    const stripe = new Stripe(stripeSecretKey);
    const user = ctx.session.user;

    if (!user.email) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User email not found",
      });
    }

    if (!user.name) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User name not found",
      });
    }

    if (!user.stripeCustomerId) {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      await ctx.db.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: newCustomer.id,
        },
      });

      user.stripeCustomerId = newCustomer.id;
    }

    const unsyncedTopUps = await stripe.checkout.sessions.list({
      limit: 100,
      customer: user.stripeCustomerId,
      status: "complete",
    });

    for (const checkoutSession of unsyncedTopUps.data) {
      const topUp = await ctx.db.topUp.findFirst({
        where: { stripeCheckoutSessionId: checkoutSession.id },
      });

      if (!topUp) {
        await ctx.db.topUp.create({
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
    const unconfirmedTopUps = (await ctx.db.topUp.findMany({
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
        await ctx.db.topUp.update({
          where: { id: topUp.id },
          data: {
            confirmedAt: new Date(),
            amount,
          },
        });
      }
    }

    const tokenUsage = await ctx.db.tokenUsage.findMany({
      where: { userId: user.id },
    });
    const topUps = await ctx.db.topUp.findMany({
      where: { userId: user.id, confirmedAt: { not: null } },
    });

    const totalTokenCost = tokenUsage.reduce((acc, { input, output }) => {
      return acc + input * tokenPrices.input + output * tokenPrices.output;
    }, 0);

    const totalTopUp = topUps.reduce((acc, { amount }) => {
      return acc + (amount ?? 0);
    }, 0);

    const balance = totalTopUp - totalTokenCost;

    await ctx.db.user.update({
      where: { id: user.id },
      data: { currentBalance: balance },
    });

    return {
      totalTokenCost,
      totalTopUp,
      balance,
      formattedBalance: balance.toFixed(2),
    };
  }),
});
