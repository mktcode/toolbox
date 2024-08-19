"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  DashboardHeader,
  DashboardHeaderH1,
} from "~/app/dashboard/_components/layout";
import useNewTemplate from "../_lib/useNewTemplate";
import { api } from "~/trpc/react";
import Spinner from "~/app/_components/spinner";

export default function NewTemplatePageHeader() {
  const { name, description, body, fields } = useNewTemplate();

  const createTemplate = api.template.create.useMutation();

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
            createTemplate.mutate({ name, description, body, fields })
          }
        >
          {createTemplate.isPending && (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving
            </>
          )}
          {!createTemplate.isPending && (
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
