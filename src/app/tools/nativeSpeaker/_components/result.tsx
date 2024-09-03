"use client";

import { useState } from "react";
import { type Output } from "~/server/api/routers/nativeSpeaker";
import CopyButton from "~/app/_components/copyButton";

export default async function Result() {
  const [variants, setVariants] = useState<Output["variants"]>([]);

  return (
    <div className="border-l p-4">
      <h2 className="mb-2 text-xl font-semibold">Refined Variants</h2>
      {variants.length > 0 ? (
        <div className="space-y-2">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="rounded-md border border-indigo-200 bg-indigo-50 p-3"
            >
              <p className="text-sm">{variant}</p>
              <CopyButton
                text={variant}
                classNames="button shy mt-2"
                label="Copy to Clipboard"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-500">
          No variants generated yet.
        </p>
      )}
    </div>
  );
}
