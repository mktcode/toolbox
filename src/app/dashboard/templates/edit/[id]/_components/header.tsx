"use client";

import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  DashboardHeader,
  DashboardHeaderH1,
} from "~/app/dashboard/_components/layout";
import { api } from "~/trpc/react";
import Spinner from "~/app/_components/spinner";
import useTemplateForm, {
  type TemplateWithFields,
} from "../../../_lib/useTemplateForm";

export default function EditTemplatePageHeader({
  template,
}: {
  template: TemplateWithFields;
}) {
  const { name, description, body, isPublic, llmId } =
    useTemplateForm(template);

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
        <Link href="/dashboard/templates" className="mr-2">
          <button className="button shy">Cancel</button>
        </Link>
        <Link
          href={`/template/${template.id}`}
          className="mr-2"
          target="_blank"
        >
          <button className="button shy">
            Open
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4 opacity-40" />
          </button>
        </Link>
        <button
          className="button"
          onClick={() =>
            editTemplate.mutate({
              id: template.id,
              name,
              description,
              body,
              isPublic,
              llmId,
            })
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
