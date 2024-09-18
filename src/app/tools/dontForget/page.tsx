import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

export default async function DontForgetPage() {
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full grow flex-col bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Don't Forget</h1>
        <div className="text-gray-500">
          A simple tool to help you remember important details in your planning.
          Just share a topic and some text, and it will guide you through
          refining your ideas and ensuring nothing gets missed.
        </div>
      </div>
      <Main session={session} />
    </div>
  );
}
