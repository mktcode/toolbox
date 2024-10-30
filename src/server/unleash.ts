import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import { type Session } from "next-auth";

export const getFlags = async (session: Session | null) => {
  const definitions = await getDefinitions({
    fetchOptions: {
      next: { revalidate: 15 },
    },
  });

  const { toggles } = evaluateFlags(definitions, {
    userEmail: session?.user?.email ?? undefined,
  });
  const flags = flagsClient(toggles);

  return flags;
};
