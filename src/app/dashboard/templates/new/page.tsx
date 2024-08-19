import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const NewTemplateForm = dynamic(() => import("./_components/form"), {
  ssr: false,
});
const NewTemplatePageHeader = dynamic(() => import("./_components/header"), {
  ssr: false,
});

export default async function DashboardPage() {
  // TODO: This should get replaced everywhere with some central middleware soon!
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <NewTemplatePageHeader />
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <NewTemplateForm />
      </main>
    </>
  );
}
