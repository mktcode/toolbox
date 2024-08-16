"use client";

import { HeartIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Templates() {
  const utils = api.useUtils();
  const [templates] = api.template.getAll.useSuspenseQuery();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  const deleteTemplate = api.template.delete.useMutation({
    onSuccess: async (data) => {
      await utils.template.invalidate();
      if (selectedTemplateId === data.id) {
        setSelectedTemplateId(null);
      }
    },
  });

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex flex-col overflow-hidden rounded bg-white p-4 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">{template.name}</h2>
            <div className="flex rounded-md border px-2 py-1">
              <HeartIcon className="mr-1 h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-400">24</span>
            </div>
          </div>
          <p className="mb-4 text-base text-gray-700">{template.description}</p>
          <div className="mt-auto flex items-center justify-between space-x-2">
            <button className="button">Edit</button>
            <button
              className="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteTemplate.mutate({ id: template.id });
              }}
            >
              {deleteTemplate.isPending &&
              deleteTemplate.variables.id === template.id
                ? "Deleting..."
                : "Delete"}
            </button>
            <Link
              className="button grow"
              href={`/templates/${template.id}`}
              target="_blank"
            >
              Open in new tab
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
