import { getServerAuthSession } from "~/server/auth";
import { getFlags } from "~/server/unleash";
import Main from "./_components/main";

import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function TemplatePage({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/templates/${params.id}`)}`);
  }

  const flags = await getFlags();
  const isTemplatesEnabled = flags.isEnabled('templates');
  const template = await api.template.getOne({ id: params.id });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isTemplatesEnabled && <>
        {session?.user && <div className="w-full">
          {template && <Main template={template} />}
          {!template && <h1>Template not found.</h1>}
        </div>}
        {!session?.user && <h1>Please log in to view this page.</h1>}
      </>}
      {!isTemplatesEnabled && <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1>Feature not allowed or enabled.</h1>
      </div>}
    </main>
  );
}
