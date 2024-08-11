import { getFlags } from "~/server/unleash";

export default async function FlagEnabled({ key, children }: { key: string, children: React.ReactNode }) {
  const flags = await getFlags();

  if (flags.isEnabled(key)) {
    return <>{children}</>;
  }

  return null;
}