import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const messages = [
  {
    role: "assistant",
    content: "Hello, how can I help you?",
  },
  {
    role: "user",
    content: "I need help with a code snippet",
  },
  {
    role: "assistant",
    content: "Sure, please paste your code snippet here",
  },
  {
    role: "user",
    content: "Here it is: <code>console.log('Hello, World!')</code>",
  },
  {
    role: "assistant",
    content: "I see, let me help you with that",
  },
  {
    role: "assistant",
    content: "Here is the code snippet you requested",
  },
  {
    role: "assistant",
    content: "<code>console.log('Hello, World!')</code>",
  },
  {
    role: "user",
    content: "Thank you!",
  },
  {
    role: "assistant",
    content: "You're welcome!",
  },
  {
    role: "assistant",
    content: "Is there anything else I can help you with?",
  },
  {
    role: "user",
    content: "No, that's all. Thank you!",
  },
  {
    role: "assistant",
    content: "You're welcome! Have a great day!",
  },
];

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
        <div className="flex flex-col space-y-2 pb-80">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  message.role === "assistant"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-indigo-500 text-white"
                } rounded-lg p-4 shadow-md`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200 to-transparent">
          <div className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-md shadow-md transition-all">
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
          </div>
        </div>
      </main>
    </>
  );
}
