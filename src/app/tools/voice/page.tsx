import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

export default async function DontForgetPage() {
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full grow flex-col bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Voice Generator</h1>
        <div className="text-gray-500">
          Generate professional voice recordings from your text.
        </div>
      </div>
      <Main session={session} />
    </div>
  );
}
