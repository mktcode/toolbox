"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { type TemplateWithFields } from "../../_lib/useTemplateForm";
import { api } from "~/trpc/react";
import { Field } from "./field";

export function Fields({ template }: { template: TemplateWithFields }) {
  const { data: fields, refetch } = api.template.getAllFields.useQuery({
    templateId: template.id,
  });
  const createField = api.template.createField.useMutation({
    onSuccess: () => refetch(),
  });

  if (!fields) {
    return null;
  }

  return (
    <>
      <label
        htmlFor="about"
        className="block font-medium leading-6 text-gray-900"
      >
        Placeholders
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Insert placeholders like <code>{"{{first_name}}"}</code> into the prompt
        and replace them conveniently, via form fields when you use the
        template.
      </p>
      <div className="mt-2 rounded-md border">
        {fields.map((field) => (
          <Field key={field.id} field={field} onDelete={() => refetch()} />
        ))}
        {fields.length === 0 && (
          <div className="p-6 text-center text-xl text-gray-300">
            No placeholders added yet.
          </div>
        )}
        <div className="my-6 flex justify-center gap-x-2">
          <button
            className="button shy"
            onClick={() => {
              createField.mutate({
                templateId: template.id,
                name: "Untitled Field",
                description: "",
              });
            }}
          >
            <PlusIcon className="mr-1 h-4 w-4 opacity-30" />
            Add Field
          </button>
        </div>
      </div>
    </>
  );
}
