"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { Label, Field as FormField } from "@headlessui/react";
import { FieldOption } from "./fieldOption";

export function FieldOptions({ fieldId }: { fieldId: string }) {
  const { data: options, refetch } = api.template.getAllFieldOptions.useQuery({
    fieldId,
  });

  const createFieldOption = api.template.createFieldOption.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <FormField>
      <Label className="text-sm">Options</Label>
      <div className="rounded-md border border-gray-200">
        {options?.map((option) => (
          <FieldOption
            key={option.id}
            option={option}
            onDelete={() => refetch()}
          />
        ))}
        {!options ||
          (options.length === 0 && (
            <div className="p-6 pb-0 text-center text-xl text-gray-300">
              No options predefined yet.
            </div>
          ))}
        <div className="flex justify-center gap-x-2 p-6">
          <button
            className="button shy"
            onClick={() => {
              createFieldOption.mutate({
                fieldId,
                value: "",
              });
            }}
          >
            <PlusIcon className="mr-1 h-4 w-4 opacity-30" />
            Add Option
          </button>
        </div>
      </div>
    </FormField>
  );
}
