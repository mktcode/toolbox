import { getServerAuthSession } from "~/server/auth";
import { getFlags } from "~/server/unleash";
import Templates from "./_components/templates/main";

export default async function ProjectsPage() {
  const session = await getServerAuthSession();
  const flags = await getFlags();
  const isTemplatesEnabled = flags.isEnabled('templates');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.user && <>
          {isTemplatesEnabled && <Templates />}
          {!isTemplatesEnabled && <p className="text-2xl text-gray-400">
            Templates feature disabled. Sad, since it is the only one so far.
          </p>}
        </>}
      </div>
    </main>
  );
}
