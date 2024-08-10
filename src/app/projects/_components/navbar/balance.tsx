import { api } from "~/trpc/react";

export default function Balance() {
  const [balance] = api.user.balance.useSuspenseQuery();

  return (
    <span className="text-gray-400 ml-6 font-bold text-xl">
      {balance.formattedBalance} €
    </span>
  );
}