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
  const flags = await getFlags();

  if (flags.isEnabled(name) && enabled) {
    return <>{enabled}</>;
  }

  if (!flags.isEnabled(name) && disabled) {
    return <>{disabled}</>;
  }
}
