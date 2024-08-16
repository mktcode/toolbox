"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type FormField, parseFields } from "~/app/_lib/templates";
import { api } from "~/trpc/react";
import Grid from "./grid";

export default function Templates() {
  const utils = api.useUtils();
  const [templates] = api.template.getAll.useSuspenseQuery();
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  const createTemplate = api.template.create.useMutation({
    onSuccess: async (data) => {
      await utils.template.invalidate();
      setSelectedTemplateId(data.id);
    },
  });

  const updateTemplate = api.template.update.useMutation({
    onSuccess: async () => {
      await utils.template.invalidate();
    },
  });

  const deleteTemplate = api.template.delete.useMutation({
    onSuccess: async (data) => {
      await utils.template.invalidate();
      if (selectedTemplateId === data.id) {
        setSelectedTemplateId(null);
        setName("");
        setTemplate("");
      }
    },
  });

  useEffect(() => {
    setFormFields(parseFields(template));
  }, [template]);

  const isDisabled =
    name.length === 0 ||
    template.length === 0 ||
    createTemplate.isPending ||
    updateTemplate.isPending;

  return (
    <div className="w-full max-w-screen-md">
      <Grid />
      <div className="mb-6 space-y-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between space-x-2"
          >
            <button
              className="grow"
              onClick={(e) => {
                e.preventDefault();
                setSelectedTemplateId(template.id);
                setName(template.name);
                setTemplate(template.body);
              }}
            >
              {template.name}
            </button>
            <Link
              className="button secondary"
              href={`/templates/${template.id}`}
              target="_blank"
            >
              Open in new tab
            </Link>
            <button
              className="secondary"
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
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          value={template}
          className="mt-3 min-h-40 w-full"
          onChange={(e) => setTemplate(e.target.value)}
        />
        <div className="mt-2 space-x-2 text-sm text-gray-500">
          <button className="secondary">add text field</button>
          <button className="secondary">add choice field</button>
        </div>
        <div className="mt-6 flex w-full items-center gap-4">
          {
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedTemplateId(null);
                createTemplate.mutate({ name, body: template });
              }}
            >
              {createTemplate.isPending
                ? "Creating..."
                : selectedTemplateId
                  ? "Save As New"
                  : "Save"}
            </button>
          }
          {selectedTemplateId && (
            <button
              disabled={isDisabled}
              onClick={(e) => {
                e.preventDefault();
                updateTemplate.mutate({
                  id: selectedTemplateId,
                  name,
                  body: template,
                });
              }}
            >
              {updateTemplate.isPending ? "Updating..." : "Update"}
            </button>
          )}
        </div>
        {formFields.length > 0 && (
          <div className="mt-4">
            <h2 className="mt-12">Form Fields Preview</h2>
            <div className="flex flex-col">
              {formFields.map((field, index) => {
                return (
                  <div key={index} className="mt-2 flex flex-col">
                    <label>{field.label}</label>
                    {field.type === "text" && <input className="mt-1" />}
                    {field.type === "textarea" && <textarea className="mt-1" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
