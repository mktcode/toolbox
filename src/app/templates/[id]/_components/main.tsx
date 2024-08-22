"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { replaceFields } from "~/app/_lib/templates";
import { useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";
import { type Session } from "next-auth";
import Header from "./header";
import Link from "next/link";
import Field from "./field";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import PromptPreview from "./promptPreview";

export default function Main({
  template,
  session,
}: {
  template: RouterOutputs["template"]["getOnePublic"];

  session: Session | null;
}) {
  const fields = template?.fields;
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

  const isDisabled =
    fields.some((field) => !values[field.name]) || complete.isPending;

  const parsedTemplate = replaceFields(template.body, values);

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6">
      {template && (
        <div className="flex min-h-screen w-full flex-col md:flex-row">
          <div className="w-full py-12 md:max-w-96 md:pr-6 xl:max-w-screen-sm">
            <Header template={template} session={session} />
            <div className="mt-6 flex flex-col space-y-3">
              {fields.map((field, index) => (
                <Field
                  key={index}
                  field={field}
                  onChange={(value: string) => {
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: value,
                    }));
                  }}
                />
              ))}
            </div>
            {session?.user && (
              <button
                className="button mt-4 w-full"
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
            <PromptPreview parsedTemplate={parsedTemplate} />
          </div>
          <div className="grow border-t py-12 md:border-l md:border-t-0 md:pl-12">
            <h1>Result</h1>
            {result && (
              <>
                <div className="my-6 rounded-xl border p-6 text-xl">
                  <Markdown remarkPlugins={[remarkGfm]} className="space-y-2">
                    {result}
                  </Markdown>
                </div>
                <CopyToClipboard
                  text={result}
                  onCopy={() => indicateSuccessfulCopy()}
                >
                  <button className="button mt-4">
                    <DocumentDuplicateIcon className="mr-2 size-4 opacity-50" />
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
