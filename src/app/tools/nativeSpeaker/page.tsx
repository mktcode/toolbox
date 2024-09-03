import Form from "./_components/form";
import { getServerAuthSession } from "~/server/auth";
import Result from "./_components/result";

export default async function NativeSpeakerPage() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full grow bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Native Speaker Refinement</h1>
        <div className="text-gray-500">
          Refine your text with the quality of a native speaker.
        </div>
      </div>
      <div className="grid grid-cols-2">
        <Form session={session} />
        <Result />
      </div>
    </div>
  );
}
