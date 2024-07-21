import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

export const tokenPrices = {
  input: 1 / 10000,
  output: 2 / 10000,
}

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  userBalance: protectedProcedure
    .query(async ({ ctx }) => {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY
      if (!stripeSecretKey) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Stripe secret key not found'
        })
      }

      const stripe = new Stripe(stripeSecretKey)
      const user = ctx.session.user

      if (!user.email) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'User email not found'
        })
      }

      if (!user.name) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'User name not found'
        })
      }

      if (!user.stripeCustomerId) {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        })

        await ctx.db.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId: newCustomer.id,
          },
        })

        user.stripeCustomerId = newCustomer.id
      }

      const unsyncedTopUps = await stripe.checkout.sessions.list({
        limit: 100,
        customer: user.stripeCustomerId,
        status: 'complete',
      })

      for (const session of unsyncedTopUps.data) {
        const topUp = await ctx.db.topUp.findFirst({
          where: { stripeCheckoutSessionId: session.id },
        })

        if (!topUp) {
          await ctx.db.topUp.create({
            data: {
              stripeCheckoutSessionId: session.id,
              user: { connect: { id: user.id } },
              amount: (session.amount_total ?? 0) / 100,
            },
          })
        }
      }

      const unconfirmedTopUps = await ctx.db.topUp.findMany({
        where: {
          userId: user.id,
          confirmedAt: null,
        },
      })

      for (const topUp of unconfirmedTopUps) {
        const session = await stripe.checkout.sessions.retrieve(topUp.stripeCheckoutSessionId)

        const amount = (session.amount_total ?? 0) / 100

        if (session.payment_status === 'paid') {
          await ctx.db.topUp.update({
            where: { id: topUp.id },
            data: {
              confirmedAt: new Date(),
              amount,
            },
          })
        }
      }

      const tokenUsage = await ctx.db.tokenUsage.findMany({
        where: { userId: user.id },
      })
      const topUps = await ctx.db.topUp.findMany({
        where: { userId: user.id },
      })

      const totalTokenCost = tokenUsage.reduce((acc, { input, output }) => {
        return acc + input * tokenPrices.input + output * tokenPrices.output
      }, 0)

      const totalTopUp = topUps.reduce((acc, { amount }) => {
        return acc + (amount ?? 0)
      }, 0)

      return {
        totalTokenCost,
        totalTopUp,
        balance: totalTopUp - totalTokenCost,
      }
    }),
});
