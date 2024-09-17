import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

export default async function NativeSpeakerPage() {
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full grow flex-col bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Native Speaker Refinement</h1>
        <div className="text-gray-500">
          Refine your text with the quality of a native speaker.
        </div>
      </div>
      <Main session={session} />
    </div>
  );
}
