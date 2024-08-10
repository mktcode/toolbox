'use client';

import { api } from "~/trpc/react";

export default function TopupButton() {
  const createTopUp = api.topUp.create.useMutation({
    onSuccess: (url) => {
      window.open(url, '_blank');
    }
  });

  return (
    <button className="small ml-6" onClick={() => createTopUp.mutate()}>
      {createTopUp.isPending ? 'opening new window...' : 'topup'}
    </button>
  )
}