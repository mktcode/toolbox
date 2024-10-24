import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

export default async function NativeSpeakerPage() {
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full grow flex-col bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Proofreader</h1>
        <div className="text-gray-500">
          Fix typos, grammar, and style issues. Get suggestions for better
          wording and readability.
        </div>
      </div>
      <Main session={session} />
    </div>
  );
}
