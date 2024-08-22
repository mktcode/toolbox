"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { Label, Field as FormField, Input } from "@headlessui/react";

export function FieldOptions({ fieldId }: { fieldId: string }) {
  const { data: options, refetch } = api.template.getAllFieldOptions.useQuery({
    fieldId,
  });

  const createFieldOption = api.template.createFieldOption.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteFieldOption = api.template.deleteFieldOption.useMutation({
    onSuccess: () => refetch(),
  });

  return (
    <FormField>
      <Label className="text-sm">Options</Label>
      <div className="rounded-md border border-gray-200">
        {options?.map((option) => (
          <div key={option.id} className="flex space-x-2 px-3 py-1 first:pt-3">
            <Input
              type="text"
              className="grow rounded-md border border-gray-300 px-2 py-1"
              value={option.value}
              onChange={(e) => {
                console.log("TODO");
              }}
            />
            <button
              className="button shy"
              onClick={() => {
                deleteFieldOption.mutate({
                  id: option.id,
                });
              }}
            >
              <TrashIcon className="h-4 w-4 opacity-30" />
            </button>
          </div>
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
              console.log("TODO");
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
