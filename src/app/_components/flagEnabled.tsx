import { getFlags } from "~/server/unleash";

export default async function FlagEnabled({ flag, children }: { flag: string, children: React.ReactNode }) {
  const flags = await getFlags();
  console.log(flag);

  if (flags.isEnabled(flag)) {
    return <>{children}</>;
  }

  return null;
}