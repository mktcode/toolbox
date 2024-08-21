import { api } from "~/trpc/server";
import { DashboardHeader, DashboardHeaderH1 } from "./_components/layout";
import Templates from "./_components/templates";

export default async function DashboardPage() {
  const templates = await api.template.getAllPublic();

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>Explore Templates</DashboardHeaderH1>
      </DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Templates templates={templates} />
      </main>
    </>
  );
}
