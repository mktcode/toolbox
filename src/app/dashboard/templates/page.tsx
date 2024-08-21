import { getServerAuthSession } from "~/server/auth";
import List from "./_components/list";
import TemplateListPageHeader from "./_components/TemplateListPageHeader";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const templates = await api.template.getAllForUser();

  return (
    <>
      <TemplateListPageHeader numberOfTemplates={templates.length} />
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <List templates={templates} />
      </main>
    </>
  );
}
