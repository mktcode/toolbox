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
        Prompt Form
      </label>
      <p className="text-sm leading-6 text-gray-500">
        Use form fields for dynamic content in the prompt. Use{" "}
        <code>{"{{field_name}}"}</code> in the prompt template, to insert the
        content when using the template.
      </p>
      <div className="mt-2 rounded-md border">
        {fields.map((field) => (
          <Field key={field.id} field={field} onDelete={() => refetch()} />
        ))}
        {fields.length === 0 && (
          <div className="p-6 text-center text-xl text-gray-300">
            No form fields added yet.
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
