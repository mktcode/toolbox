import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { DashboardHeader, DashboardHeaderH1 } from "../../_components/layout";
import { CheckIcon } from "@heroicons/react/20/solid";
import NewTemplate from "../../_components/templates/new";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

export default async function DashboardPage() {
  // TODO: This should get replaced everywhere with some central middleware soon!
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderH1>
          New Template
          <button className="button shy ml-2">
            <PencilIcon className="h-6 w-6 opacity-30" />
          </button>
        </DashboardHeaderH1>
        <div className="ml-auto flex">
          <Link href="/dashboard/templates">
            <button className="button shy mr-2">Cancel</button>
          </Link>
          <button className="button">
            <CheckIcon className="mr-1 h-4 w-4 opacity-30" />
            Save
          </button>
        </div>
      </DashboardHeader>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <NewTemplate />
      </main>
    </>
  );
}
