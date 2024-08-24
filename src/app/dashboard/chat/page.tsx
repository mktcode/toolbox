import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
            <div className="ml-auto flex space-x-2">
              <button className="button shy">
                <PencilSquareIcon className="mr-2 h-4 w-4" />
                No Template
              </button>
              <button className="button">Send</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
