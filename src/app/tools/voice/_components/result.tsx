"use client";

import { type Output } from "~/server/api/routers/voice";
import CopyButton from "~/app/_components/copyButton";

export default function Result({ output }: { output: Output | undefined }) {
  return (
    <div className="border-l p-4">
      <h2 className="mb-2 text-xl font-semibold">Generated Audio</h2>
      {output ? (
        <>
          <audio key={output.url} controls className="mb-2 w-full">
            <source src={output.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <CopyButton
            text={output.url}
            classNames="button shy mt-2"
            label="Copy URL"
          />
          <a
            href={output.url}
            download
            className="button mt-2 w-full"
            target="_blank"
          >
            Download
          </a>
        </>
      ) : (
        <p className="text-sm italic text-gray-500">No audio generated yet.</p>
      )}
    </div>
  );
}
