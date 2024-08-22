import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { api } from "~/trpc/server";

const EditTemplateForm = dynamic(() => import("./_components/form"), {
  ssr: false,
});
const EditTemplatePageHeader = dynamic(() => import("./_components/header"), {
  ssr: false,
});

export default async function DashboardTemplatesEditPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const template = await api.template.getOne({ id: params.id });

  if (!template) {
    redirect("/dashboard/templates");
  }

  return (
    <>
      <EditTemplatePageHeader template={template} />
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <EditTemplateForm template={template} />
      </main>
    </>
  );
}
