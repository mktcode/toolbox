import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(`/templates/${params.id}`)}`,
    );
  }

  const template = await api.template.getOne({ id: params.id });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full">
        {template && <Main template={template} session={session} />}
        {!template && <h1>Template not found.</h1>}
      </div>
    </main>
  );
}
