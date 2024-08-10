'use client';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { parseFields, replaceFields } from "~/app/_lib/templates";
import { type Template } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Main(params: { template: Template }) {
  const { template } = params;
  const fields = parseFields(template.body);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  function indicateSuccessfulCopy() {
    setCopiedResult(true);
    setTimeout(() => {
      setCopiedResult(false);
    }, 1000);
  }

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

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6">
      {template && <div className="flex flex-col md:flex-row w-full min-h-screen">
        <div className="md:pr-6 py-12 w-full md:max-w-96 xl:max-w-screen-sm">
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
                    className="mt-1 min-h-28"
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
        <div className="md:pl-12 py-12 md:border-l md:border-t-0 border-t grow">
          <h1>Result</h1>
          {result && <>
            <div className="mt-2">{result}</div>
            <CopyToClipboard text={result}
              onCopy={() => indicateSuccessfulCopy()}>
              <button>
                {copiedResult ? "Copied!" : "Copy to clipboard"}
              </button>
            </CopyToClipboard>
          </>}
          {!result && <div className="mt-2 text-gray-400">No result yet.</div>}
        </div>
      </div>}
      {!template && <h1>Template not found.</h1>}
    </div>
  );
}