import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Discussion about AI in Software Development
          </h1>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mt-auto rounded-md shadow-md transition-all">
          <textarea
            className="block w-full resize-none rounded-md rounded-b-none border-none p-6 text-lg focus:border-gray-400 focus:ring-gray-400"
            rows={5}
            placeholder="Chat with the AI ..."
          />
          <div className="flex rounded-b-md bg-gray-100 p-2">
            <button className="ml-auto rounded-md bg-indigo-800 px-4 py-2 text-white">
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
