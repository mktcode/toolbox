"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { parseFields, replaceFields } from "~/app/_lib/templates";
import { type Template } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Session } from "next-auth";
import Header from "./header";
import Link from "next/link";

export default function Main({
  template,
  session,
}: {
  template: Template;
  session: Session | null;
}) {
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

  const isDisabled =
    fields.some((field) => !values[field.name]) || complete.isPending;

  const parsedTemplate = replaceFields(template.body, values);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6">
      {template && (
        <div className="flex min-h-screen w-full flex-col md:flex-row">
          <div className="w-full py-12 md:max-w-96 md:pr-6 xl:max-w-screen-sm">
            <Header template={template} session={session} />
            <div className="flex flex-col">
              {fields.map((field, index) => {
                return (
                  <div key={index} className="mt-2 flex flex-col">
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
                  </div>
                );
              })}
              {session?.user && (
                <button
                  className="button mt-4"
                  disabled={isDisabled}
                  onClick={() => {
                    complete.mutate({
                      message: parsedTemplate,
                    });
                  }}
                >
                  {complete.isPending ? "Generating..." : "Run"}
                </button>
              )}
              {!session?.user && (
                <Link
                  href={`/api/auth/signin?callbackUrl=/templates/${template.id}`}
                >
                  <button className="button mt-4 w-full">Sign in</button>
                </Link>
              )}
            </div>
          </div>
          <div className="grow border-t py-12 md:border-l md:border-t-0 md:pl-12">
            <h1>Result</h1>
            {result && (
              <>
                <div className="mt-2">{result}</div>
                <CopyToClipboard
                  text={result}
                  onCopy={() => indicateSuccessfulCopy()}
                >
                  <button>
                    {copiedResult ? "Copied!" : "Copy to clipboard"}
                  </button>
                </CopyToClipboard>
              </>
            )}
            {!result && (
              <div className="mt-2 text-gray-400">No result yet.</div>
            )}
          </div>
        </div>
      )}
      {!template && <h1>Template not found.</h1>}
    </div>
  );
}
