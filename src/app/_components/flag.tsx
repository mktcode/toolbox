import { getServerAuthSession } from "~/server/auth";
import { getFlags } from "~/server/unleash";

export default async function Flag({
  name,
  enabled,
  disabled,
}: {
  name: string;
  enabled?: React.ReactNode;
  disabled?: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const flags = await getFlags(session);

  if (flags.isEnabled(name) && enabled) {
    return <>{enabled}</>;
  }

  if (!flags.isEnabled(name) && disabled) {
    return <>{disabled}</>;
  }
}
