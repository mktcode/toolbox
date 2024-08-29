import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ChatHeader from "./_components/header";

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

  const { templateId, chatSessionId } = params;

  const template = await api.template.getOnePublicOrOwned({ templateId });

  if (!template) {
    return <div>Template not found</div>;
  }

  const chatSessions = await api.chatRouter.getAllForUserAndTemplate({
    templateId,
  });
  const chatSession = await api.chatRouter.getOneForUser({ chatSessionId });

  if (!chatSession) {
    return <div>Chat session not found</div>;
  }

  return (
    <>
      <ChatHeader
        template={template}
        chatSessions={chatSessions}
        currentChatSessionId={chatSession.id}
      />
    </>
  );
}
