import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>
          Discussion about AI in Software Development
        </DashboardHeaderH1>
      </DashboardHeader>

      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mt-auto rounded-md shadow-md transition-all">
          <textarea
            className="block w-full resize-none rounded-md rounded-b-none border-none p-6 text-lg focus:border-gray-400 focus:ring-gray-400"
            rows={5}
            placeholder="Chat with the AI ..."
          />
          <div className="flex rounded-b-md bg-gray-100 p-2">
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <MicrophoneIcon className="h-6 w-6 text-gray-400" />
            </button>
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <PaperClipIcon className="h-6 w-6 text-gray-400" />
            </button>
            <button className="button ml-auto">Send</button>
          </div>
        </div>
      </main>
    </>
  );
}
