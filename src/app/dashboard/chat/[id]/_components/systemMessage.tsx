"use client";

import { type CoreMessage } from "ai";

export default function SystemMessage({ message }: { message: CoreMessage }) {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg border border-gray-300 px-4 py-1 text-sm text-gray-400">
        {typeof message.content === "string" && (
          <>
            <span className="font-semibold">Instructions: </span>
            {message.content}
          </>
        )}
      </div>
    </div>
  );
}
