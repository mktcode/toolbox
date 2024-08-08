import { ProjectList } from "./_components/projectList";
import { getServerAuthSession } from "~/server/auth";
import { getFlags } from "~/server/unleash";
import Templates from "./_components/templates/main";

export default async function ProjectsPage() {
  const session = await getServerAuthSession();
  const flags = await getFlags();
  const isTemplatesEnabled = flags.isEnabled('senior.templates');
  const isProjectsEnabled = flags.isEnabled('senior.projects');

  return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && isTemplatesEnabled && <Templates />}
          {session?.user && isProjectsEnabled && <ProjectList />}
        </div>
      </main>
  );
}
