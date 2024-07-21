import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createTopUp: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.session.user

      if (!user.stripeCustomerId) {
        throw new Error('User has no Stripe ID')
      }

      const stripeSecretKey = process.env.STRIPE_SECRET_KEY
      if (!stripeSecretKey) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Stripe secret key not found'
        })
      }
      const stripe = new Stripe(stripeSecretKey)

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: user.stripeCustomerId,
        mode: 'payment',
        line_items: [
          {
            price: 'price_1OH2AUCpwCCYrzpUSXvJ9dFv',
            quantity: 1,
          }
        ],
        success_url: 'http://localhost:3000/assistants',
      })

      await ctx.db.topUp.create({
        data: {
          stripeCheckoutSessionId: checkoutSession.id,
          user: { connect: { id: user.id } },
        },
      })

      return checkoutSession.url
    }),
});
