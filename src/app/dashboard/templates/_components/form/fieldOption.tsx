"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { Input } from "@headlessui/react";
import { type TemplateFieldOption } from "@prisma/client";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export function FieldOption({
  option,
  onDelete,
}: {
  option: TemplateFieldOption;
  onDelete: () => void;
}) {
  const [value, setValue] = useState(option.value);
  const debouncedValue = useDebounce(value, 1000);

  const updateOption = api.template.updateFieldOption.useMutation();
  const deleteOption = api.template.deleteFieldOption.useMutation({
    onSuccess: () => onDelete(),
  });

  useEffect(() => {
    updateOption.mutate({
      id: option.id,
      value: debouncedValue,
    });
    // TODO: This causes an update on initial render. Investigate how to do this correctly.
  }, [debouncedValue]);

  return (
    <div className="flex space-x-2 px-3 py-1 first:pt-3">
      <Input
        type="text"
        className="grow rounded-md border border-gray-300 px-2 py-1"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="button shy"
        onClick={() => {
          deleteOption.mutate({
            id: option.id,
          });
        }}
      >
        <TrashIcon className="h-4 w-4 opacity-30" />
      </button>
    </div>
  );
}
