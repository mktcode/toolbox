"use client";

import { type Output } from "~/server/api/routers/proofreader";
import CopyButton from "~/app/_components/copyButton";
import Markdown from "react-markdown";

export default function Result({ output }: { output: Output }) {
  const { corrections, suggestions, correctedText } = output;

  return (
    <div className="border-l p-4">
      <h2 className="mb-2 text-xl font-semibold">Corrections</h2>
      {corrections.length > 0 ? (
        <div className="space-y-2">
          {corrections.map((correction, index) => (
            <div
              key={index}
              className="rounded-md border border-indigo-200 bg-indigo-50 p-3"
            >
              <p className="text-sm">
                <Markdown>{correction}</Markdown>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">No corrections yet.</p>
      )}
      <h2 className="mb-2 mt-4 text-xl font-semibold">Suggestions</h2>
      {suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="rounded-md border border-indigo-200 bg-indigo-50 p-3"
            >
              <p className="text-sm">
                <Markdown>{suggestion}</Markdown>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">No suggestions yet.</p>
      )}
      <h2 className="mb-2 mt-4 text-xl font-semibold">Corrected Text</h2>
      {correctedText.length > 0 ? (
        <div className="rounded-md border border-indigo-200 bg-indigo-50 p-3">
          <div className="space-y-2 text-sm">
            <Markdown>{correctedText}</Markdown>
          </div>
          <CopyButton
            text={correctedText}
            classNames="button shy mt-2"
            label="Copy to Clipboard"
          />
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">No corrected text yet.</p>
      )}
    </div>
  );
}
