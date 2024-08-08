'use client';

import { useEffect, useState } from "react";

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
  const [template, setTemplate] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);

  useEffect(() => {
    const singleLineFields = template.match(singleLineRegex)?.map(parseSingleLineFormField) ?? [];
    const multiLineFields = template.match(multiLineRegex)?.map(parseMultiLineFormField) ?? [];

    setFormFields([...singleLineFields, ...multiLineFields]);
  }, [template]);

  return <div className="border rounded-md p-4 w-full max-w-screen-md">
    <h1 className="mb-6">New Template</h1>
    <div className="flex flex-col">
      <textarea
        value={template}
        className="w-full min-h-60"
        onChange={(e) => setTemplate(e.target.value)}
      >

      </textarea>
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button className="mt-6 secondary" disabled={template.length === 0}>
          Save to Favorites
        </button>
        <button className="mt-6" disabled={template.length === 0}>
          Send
        </button>
      </div>
    </div>
  </div>;
}