import { getServerAuthSession } from "~/server/auth";
import { getFlags } from "~/server/unleash";
import Main from "./_components/main";

export default async function TemplatePage({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  const flags = await getFlags();
  const isTemplatesEnabled = flags.isEnabled('senior.templates');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isTemplatesEnabled && <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.user && <Main id={params.id} />}
        {!session?.user && <h1>Please log in to view this page.</h1>}
      </div>}
      {!isTemplatesEnabled && <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1>Feature not allowed or enabled.</h1>
      </div>}
    </main>
  );
}
