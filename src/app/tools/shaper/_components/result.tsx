"use client";

import { type Output } from "~/server/api/routers/shaper";
import CopyButton from "~/app/_components/copyButton";

export default function Result({ output }: { output: Output | undefined }) {
  return (
    <div className="border-l p-4">
      <h2 className="mb-2 text-xl font-semibold">Output</h2>
      {output ? (
        <div className="space-y-2">
          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3">
            <p className="text-sm">{output.productSummary}</p>
            <CopyButton
              text={output.productSummary}
              classNames="button shy mt-2"
              label="Copy to Clipboard"
            />
          </div>
          <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3">
            <p className="text-sm">{output.featureFeedback}</p>
            <CopyButton
              text={output.featureFeedback}
              classNames="button shy mt-2"
              label="Copy to Clipboard"
            />
          </div>
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">No output generated yet.</p>
      )}
    </div>
  );
}
