"use client";

import { type Output } from "~/server/api/routers/dontForget";
import CopyButton from "~/app/_components/copyButton";
import Markdown from "react-markdown";

export default function Result({ output }: { output: Output | undefined }) {
  return (
    <div className="border-l p-4">
      <h2 className="mb-2 text-xl font-semibold">Response</h2>
      {output ? (
        <div className="space-y-2">
          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3">
            <p className="text-sm">
              <Markdown>{output.response}</Markdown>
            </p>
            <CopyButton
              text={output.response}
              classNames="button shy mt-2"
              label="Copy to Clipboard"
            />
          </div>
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">
          No response generated yet.
        </p>
      )}
    </div>
  );
}
