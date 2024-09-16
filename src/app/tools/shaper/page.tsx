import { getServerAuthSession } from "~/server/auth";

import Form from "./_components/form";

export default async function NativeSpeakerPage() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full grow bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Shaper</h1>
        <div className="text-gray-500">
          Meaningful feature planning. Your developers will appreciate it.
        </div>
      </div>
      <div className="grid grid-cols-2">
        <Form session={session} />
      </div>
    </div>
  );
}
