'use client';

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea";
  value: string;
};

// single line examples: {=name=}, {= name =}, {= My First-Name =}
// multi line examples: {[description]}, ... (same as single line)
const singleLineRegex = new RegExp(/\{=\s*(\w[\w\s-]*)\s*=\}/, "ig");
const multiLineRegex = new RegExp(/\{\[\s*([\w\s-]*)\s*\]\}/, "ig");

function parseSingleLineFormField(match: string): FormField {
  const name = match.replace(singleLineRegex, "$1");
  const label = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    name,
    label,
    type: "text",
    value: "",
  };
}

function parseMultiLineFormField(match: string): FormField {
  const name = match.replace(multiLineRegex, "$1");
  const label = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return {
    name: name,
    label,
    type: "textarea",
    value: "",
  };
}

export default function Templates() {
  const utils = api.useUtils();
  const [templates] = api.template.getAll.useSuspenseQuery();
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

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

  useEffect(() => {
    const singleLineFields = template.match(singleLineRegex)?.map(parseSingleLineFormField) ?? [];
    const multiLineFields = template.match(multiLineRegex)?.map(parseMultiLineFormField) ?? [];

    setFormFields([...singleLineFields, ...multiLineFields]);
  }, [template]);

  const isDisabled = name.length === 0 || template.length === 0 || createTemplate.isPending || updateTemplate.isPending;

  return <div className="w-full max-w-screen-md">
    <h1 className="mb-6">Templates</h1>
    <div className="space-y-2">
      {templates.map((template) => (
        <div
          key={template.id}
          className="p-4 border rounded-md cursor-pointer"
          onClick={() => {
            setSelectedTemplateId(template.id);
            setName(template.name);
            setTemplate(template.body);
          }}
        >
          {template.name}
        </div>
      ))}
    </div>
    <h1 className="my-6">New Template</h1>
    <div className="flex flex-col">
      <input type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea
        value={template}
        className="w-full min-h-60 mt-6"
        onChange={(e) => setTemplate(e.target.value)}
      />
      <div className="text-sm text-gray-500 mt-2">
        {"Use {= First Name =} or {[ description ]} to add single or multi line form fields."}
      </div>
      {formFields.length > 0 && <div className="mt-4">
        <h2>Form Fields</h2>
        <div className="flex flex-col">
          {formFields.map((field, index) => {
            return <div key={index} className="flex flex-col mt-2">
              <label>{field.label}</label>
              {field.type === "text" && <input className="mt-1" />}
              {field.type === "textarea" && <textarea className="mt-1" />}
            </div>;
          })}
        </div>
      </div>}
      <div className="flex gap-4 mt-6 w-full items-center">
        {<button
          className="secondary"
          onClick={(e) => {
            e.preventDefault();
            setSelectedTemplateId(null);
            createTemplate.mutate({ name, body: template });
          }}
        >
          {createTemplate.isPending ? "Creating..." : selectedTemplateId ? "Save As New" : "Save"}
        </button>}
        {selectedTemplateId && <button
          className="secondary"
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            updateTemplate.mutate({ id: selectedTemplateId, name, body: template });
          }}
        >
          {updateTemplate.isPending ? "Updating..." : "Update"}
        </button>}
        <button disabled={isDisabled} className="grow">
          Send
        </button>
      </div>
    </div>
  </div>;
}