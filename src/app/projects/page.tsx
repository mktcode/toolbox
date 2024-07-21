import { ProjectList } from "~/app/_components/projectList";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.project.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && <ProjectList />}
        </div>
      </main>
    </HydrateClient>
  );
}
