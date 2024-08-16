import { getServerAuthSession } from "~/server/auth";
import Templates from "./../_components/templates";
import { redirect } from "next/navigation";
import { DashboardHeader, DashboardHeaderH1 } from "../_components/layout";
import { api } from "~/trpc/server";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const templates = await api.template.getAll();

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>{templates.length} Templates</DashboardHeaderH1>
        <div className="ml-auto">
          <Link href="/dashboard/templates/new">
            <button className="button grow">Create Template</button>
          </Link>
        </div>
      </DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Templates />
      </main>
    </>
  );
}
