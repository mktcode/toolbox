// import { getServerAuthSession } from "~/server/auth";

export default async function NativeSpeakerPage() {
  // const session = await getServerAuthSession();

  return (
    <div className="w-full grow bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Search</h1>
        <div className="text-gray-500">
          Reduce time spend on searching the web for relevant information.
        </div>
      </div>
      <div className="grid grid-cols-2">Coming soon...</div>
    </div>
  );
}
