import { getServerAuthSession } from "~/server/auth";
import Main from "./_components/main";

import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import FlagEnabled from "~/app/_components/flagEnabled";
import FlagDisabled from "~/app/_components/flagDisabled";

export default async function TemplatePage({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/templates/${params.id}`)}`);
  }

  const template = await api.template.getOne({ id: params.id });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <FlagEnabled flag="templates">
        {session?.user && <div className="w-full">
          {template && <Main template={template} />}
          {!template && <h1>Template not found.</h1>}
        </div>}
        {!session?.user && <h1>Please log in to view this page.</h1>}
      </FlagEnabled>
      <FlagDisabled flag="templates">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1>Feature not allowed or enabled.</h1>
        </div>
      </FlagDisabled>
    </main>
  );
}
