import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ChatHeader from "./_components/header";
import Chat from "./_components/chat";

export default async function TemplatePage({
  params,
}: {
  params: {
    templateId: string;
    chatSessionId: string;
  };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const chatSessions = await api.chatRouter.getAllForUser();
  const chatSession = await api.chatRouter.getOneForUser({
    chatSessionId: params.chatSessionId,
  });

  if (!chatSession) {
    return <div>Chat session not found</div>;
  }

  return (
    <>
      <ChatHeader
        chatSessions={chatSessions}
        currentChatSessionId={chatSession.id}
      />
      <Chat chatSession={chatSession} />
    </>
  );
}
