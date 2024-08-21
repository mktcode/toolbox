"use client";

import {
  CheckIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { api } from "~/trpc/react";
import { Input, Label, Field as FormField, Textarea } from "@headlessui/react";
import { type TemplateField } from "@prisma/client";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export function Field({
  field,
  onDelete,
}: {
  field: TemplateField;
  onDelete: () => void;
}) {
  const [name, setName] = useState(field.name);
  const [description, setDescription] = useState(field.description);
  const [defaultValue, setDefaultValue] = useState(field.defaultValue);
  const [copiedPlaceholder, setCopiedPlaceholder] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(
    "{{ " + field.name + " }}",
  );

  useEffect(() => {
    setPlaceholder("{{ " + name + " }}");
  }, [name]);

  function indicateSuccessfulCopy() {
    setCopiedPlaceholder(true);
    setTimeout(() => {
      setCopiedPlaceholder(false);
    }, 1000);
  }

  const updateField = api.template.updateField.useMutation();
  const deleteField = api.template.deleteField.useMutation({
    onSuccess: () => onDelete(),
  });

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
              onChange={(e) => setName(e.target.value)}
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
          <FormField>
            <Label className="text-sm">Options</Label>
            <div className="rounded-md border border-gray-200 p-6 text-center text-xl text-gray-300">
              <div>No options predefined yet.</div>
              <div className="mt-6 flex justify-center gap-x-2">
                <button
                  className="button shy"
                  onClick={() => {
                    // TODO
                  }}
                >
                  <PlusIcon className="mr-1 h-4 w-4 opacity-30" />
                  Add Option
                </button>
              </div>
            </div>
          </FormField>
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
