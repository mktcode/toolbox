"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Messages({
  messages,
}: {
  messages: { role: string; content: string }[];
}) {
  return (
    <div className="flex flex-col space-y-2 pb-80">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "assistant" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`${
              message.role === "assistant"
                ? "bg-gray-100 text-gray-800"
                : "bg-indigo-500 text-white"
            } rounded-lg p-4 shadow-md`}
          >
            <Markdown remarkPlugins={[remarkGfm]} className="space-y-2">
              {message.content}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}
