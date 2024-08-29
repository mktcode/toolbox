import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function TemplatesNewChatPage({
  params,
}: {
  params: { templateId: string };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const chatSession = await api.chatRouter.getLastEmtpyOrNewSession();

  redirect(`/template/${params.templateId}/${chatSession.id}`);
}
