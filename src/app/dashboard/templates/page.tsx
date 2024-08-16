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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Templates />
        </div>
      </main>
    </>
  );
}
