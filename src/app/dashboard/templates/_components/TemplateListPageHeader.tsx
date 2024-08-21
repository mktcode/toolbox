"use client";

import { DashboardHeader, DashboardHeaderH1 } from "../../_components/layout";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Spinner from "~/app/_components/spinner";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function TemplateListPageHeader({
  numberOfTemplates,
}: {
  numberOfTemplates: number;
}) {
  const router = useRouter();
  const createTemplate = api.template.create.useMutation({
    onSuccess(data) {
      router.push(`/dashboard/templates/edit/${data.id}`);
    },
  });

  return (
    <DashboardHeader>
      <DashboardHeaderH1>{numberOfTemplates} Templates</DashboardHeaderH1>
      <div className="ml-auto">
        <button className="button grow" onClick={() => createTemplate.mutate()}>
          {createTemplate.isPending && (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Creating template
            </>
          )}
          {!createTemplate.isPending && (
            <>
              <PlusIcon className="mr-2 h-4 w-4 opacity-40" />
              Create Template
            </>
          )}
        </button>
      </div>
    </DashboardHeader>
  );
}
