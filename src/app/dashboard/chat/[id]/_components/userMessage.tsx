"use client";

import { type CoreMessage } from "ai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function UserMessage({ message }: { message: CoreMessage }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-lg bg-indigo-600 px-4 py-3 text-indigo-100 shadow-md">
        {typeof message.content === "string" && (
          <Markdown remarkPlugins={[remarkGfm]} className="space-y-2">
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  );
}
