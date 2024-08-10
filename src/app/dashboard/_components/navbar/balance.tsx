'use client';

import { api } from "~/trpc/react";

export default function Balance() {
  const { data: balance } = api.user.balance.useQuery();

  return (
    <span className="text-gray-400 ml-6 text-xl">
      {balance && <>${balance.formattedBalance} €</>}
      {!balance && <>... €</>}
    </span>
  );
}