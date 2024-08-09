'use client';

import { api } from "~/trpc/react";

export default function Main(params: { id: string }) {
  const [template] = api.template.getOne.useSuspenseQuery({ id: params.id });

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      {template && <div>
        <h1>{template.name}</h1>
      </div>}
      {!template && <h1>Template not found.</h1>}
    </div>
  );
}