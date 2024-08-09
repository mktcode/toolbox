'use client';

import { parseFields, replaceFields } from "~/app/_lib/templates";
import { type Template } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Main(params: { template: Template }) {
  const { template } = params;
  const fields = parseFields(template.body);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const complete = api.openai.complete.useMutation({
    onSuccess: (data) => {
      setResult(data.result);
    },
  });

  function setValue(name: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const isDisabled = fields.some((field) => !values[field.name]) || complete.isPending;

  const parsedTemplate = replaceFields(template.body, values);
  console.log(values);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4">
      {template && <div className="flex w-full min-h-screen">
        <div className="pr-12 py-12">
          <h1>{template.name}</h1>
          <div className="flex flex-col">
            {fields.map((field, index) => {
              return <div key={index} className="flex flex-col mt-2">
                <label>{field.label}</label>
                {field.type === "text" && (
                  <input
                    className="mt-1"
                    value={values[field.name]}
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    className="mt-1"
                    value={values[field.name]}
                    onChange={(e) => setValue(field.name, e.target.value)}
                  />
                )}
              </div>;
            })}
            <button
              className="mt-4"
              disabled={isDisabled}
              onClick={() => {
                complete.mutate({
                  message: parsedTemplate,
                });
              }}
            >
              {complete.isPending ? "Completing..." : "Complete"}
            </button>
          </div>
        </div>
        <div className="pl-12 py-12 border-l grow">
          <h1>Result</h1>
          {result && <div className="mt-2">{result}</div>}
          {!result && <div className="mt-2 text-gray-400">No result yet.</div>}
        </div>
      </div>}
      {!template && <h1>Template not found.</h1>}
    </div>
  );
}