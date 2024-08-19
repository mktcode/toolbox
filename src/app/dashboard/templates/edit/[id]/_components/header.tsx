"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  DashboardHeader,
  DashboardHeaderH1,
} from "~/app/dashboard/_components/layout";
import useEditTemplate from "../_lib/useEditTemplate";
import { api } from "~/trpc/react";
import Spinner from "~/app/_components/spinner";
import { type Template } from "@prisma/client";

export default function EditTemplatePageHeader({
  template,
}: {
  template: Template;
}) {
  const { id, name, description, body, fields } = useEditTemplate(template);

  const editTemplate = api.template.update.useMutation();

  return (
    <DashboardHeader>
      <DashboardHeaderH1>
        {name}
        <button className="button shy ml-2">
          <PencilIcon className="h-6 w-6 opacity-30" />
        </button>
      </DashboardHeaderH1>
      <div className="ml-auto flex">
        <Link href="/dashboard/templates">
          <button className="button shy mr-2">Cancel</button>
        </Link>
        <button
          className="button"
          onClick={() =>
            editTemplate.mutate({ id, name, description, body, fields })
          }
        >
          {editTemplate.isPending && (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving
            </>
          )}
          {!editTemplate.isPending && (
            <>
              <CheckIcon className="mr-2 h-4 w-4 opacity-40" />
              Save
            </>
          )}
        </button>
      </div>
    </DashboardHeader>
  );
}
