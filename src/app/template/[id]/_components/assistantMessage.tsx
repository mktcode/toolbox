"use client";

import { type CoreMessage } from "ai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AssistantMessage({
  message,
}: {
  message: CoreMessage;
}) {
  return (
    <div className="flex justify-start">
      <div className="chat-message rounded-lg bg-gray-100 px-4 py-3 text-gray-800 shadow-md">
        {typeof message.content === "string" && (
          <Markdown remarkPlugins={[remarkGfm]} className="space-y-2">
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  );
}
