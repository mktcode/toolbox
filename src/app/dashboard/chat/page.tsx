import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { DashboardHeader, DashboardHeaderH1 } from "./../_components/layout";
import NewMessageInput from "./_components/newMessageInput";
import { api } from "~/trpc/server";
import Messages from "./_components/messages";

export default async function DashboardChatPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const chatSession = await api.chatRouter.createSession();

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>
          Discussion about AI in Software Development
        </DashboardHeaderH1>
      </DashboardHeader>

      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Messages chatSessionId={chatSession.id} />
        <NewMessageInput chatSessionId={chatSession.id} />
      </main>
    </>
  );
}
