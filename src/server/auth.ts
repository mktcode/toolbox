import Stripe from "stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      stripeCustomerId?: string;
      currentBalance: number;
    } & DefaultSession["user"];
  }

  interface User {
    stripeCustomerId?: string;
    currentBalance: number;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          stripeCustomerId: user.stripeCustomerId,
          currentBalance: user.currentBalance,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  events: {
    createUser: async (message) => {
      const user = message.user;

      // sanity check (for typescript)
      if (!user.email) {
        throw new Error("User email not found");
      }
      if (!user.name) {
        throw new Error("User name not found");
      }

      // create a free welcome top-up
      const WELCOME_AMOUNT = 1;
      const createTopup = db.topUp.create({
        data: {
          amount: WELCOME_AMOUNT,
          note: "Welcome!",
          confirmedAt: new Date(),
          userId: user.id,
        },
      });
      const updateBalance = db.user.update({
        where: { id: user.id },
        data: { currentBalance: { increment: WELCOME_AMOUNT } },
      });

      await db.$transaction([createTopup, updateBalance]);

      // create stripe customer
      if (user.stripeCustomerId) {
        return;
      }

      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        throw new Error("Stripe secret key not found");
      }

      const stripe = new Stripe(stripeSecretKey);

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
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
