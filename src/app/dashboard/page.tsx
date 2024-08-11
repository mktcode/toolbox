import { getServerAuthSession } from "~/server/auth";
import Templates from "./_components/templates/main";
import FlagEnabled from "../_components/flagEnabled";
import FlagDisabled from "../_components/flagDisabled";

export default async function ProjectsPage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.user && <>
          <FlagEnabled key="templates">
            <Templates />
          </FlagEnabled>
          <FlagDisabled key="templates">
            <p className="text-2xl text-gray-400">
              Templates feature disabled. Sad, since it is the only one so far.
            </p>
          </FlagDisabled>
        </>}
      </div>
    </main>
  );
}
