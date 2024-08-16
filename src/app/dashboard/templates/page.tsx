import { getServerAuthSession } from "~/server/auth";
import Templates from "./../_components/templates";
import { redirect } from "next/navigation";
import DashboardHeader from "../_components/layout";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <DashboardHeader>Templates</DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Templates />
      </main>
    </>
  );
}
