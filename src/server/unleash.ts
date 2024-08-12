import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";

export const getFlags = async () => {
  const definitions = await getDefinitions({
    fetchOptions: {
      next: { revalidate: 15 },
    },
  });

  const { toggles } = evaluateFlags(definitions);
  const flags = flagsClient(toggles);

  return flags;
};
