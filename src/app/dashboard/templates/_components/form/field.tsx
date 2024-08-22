"use client";

import {
  CheckIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { Input, Label, Field as FormField, Textarea } from "@headlessui/react";
import { type TemplateField } from "@prisma/client";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDebounce } from "@uidotdev/usehooks";
import { FieldOptions } from "./fieldOptions";

export function Field({
  field,
  onDelete,
}: {
  field: TemplateField;
  onDelete: () => void;
}) {
  const [name, setName] = useState(field.name);
  const debouncedName = useDebounce(name, 1000);
  const [description, setDescription] = useState(field.description);
  const debouncedDescription = useDebounce(description, 1000);
  const [defaultValue, setDefaultValue] = useState(field.defaultValue);
  const debouncedDefaultValue = useDebounce(defaultValue, 1000);
  const [copiedPlaceholder, setCopiedPlaceholder] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(
    "{{ " + field.name + " }}",
  );

  const updateField = api.template.updateField.useMutation();
  const deleteField = api.template.deleteField.useMutation({
    onSuccess: () => onDelete(),
  });

  useEffect(() => {
    setPlaceholder("{{ " + name + " }}");
  }, [name]);

  useEffect(() => {
    updateField.mutate({
      id: field.id,
      name: debouncedName,
      description: debouncedDescription,
      defaultValue: debouncedDefaultValue,
      options: [],
    });
    // TODO: This causes an update on initial render. Investigate how to do this correctly.
  }, [debouncedName, debouncedDescription, debouncedDefaultValue]);

  function indicateSuccessfulCopy() {
    setCopiedPlaceholder(true);
    setTimeout(() => {
      setCopiedPlaceholder(false);
    }, 1000);
  }

  return (
    <div
      key={field.id}
      className="flex items-center border-b p-4 last:border-b-0"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <FormField className="mb-2">
            <Label className="text-sm">Name</Label>
            <Input
              type="text"
              className="w-full rounded-md border border-gray-300 px-2 py-1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormField>
          <FormField>
            <Label className="text-sm">Default Value</Label>
            <Textarea
              className="w-full rounded-md border border-gray-300 px-2 py-1"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label className="text-sm">Description</Label>
            <Textarea
              className="w-full rounded-md border border-gray-300 px-2 py-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
        </div>
        <div>
          <FieldOptions fieldId={field.id} />
        </div>
        <div>
          <FormField>
            <Label className="text-sm">Placeholder</Label>
            <div className="mb-2 rounded-md bg-gray-100 p-3 text-gray-500">
              {placeholder}
            </div>
            <div className="flex justify-end">
              <CopyToClipboard
                text={placeholder}
                onCopy={() => indicateSuccessfulCopy()}
              >
                <button className="button shy">
                  {copiedPlaceholder ? (
                    <>
                      copied
                      <CheckIcon className="ml-2 h-4 w-4 text-green-500" />
                    </>
                  ) : (
                    <>
                      copy to clipboard
                      <DocumentDuplicateIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </CopyToClipboard>
            </div>
          </FormField>
        </div>
      </div>
      <div className="ml-auto self-start">
        <button
          className="button shy"
          onClick={() => deleteField.mutate({ id: field.id })}
        >
          <TrashIcon className="mr-1 h-4 w-4 opacity-30" />
        </button>
      </div>
    </div>
  );
}
