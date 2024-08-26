"use client";

import { api } from "~/trpc/react";

export default function Messages({ chatSessionId }: { chatSessionId: string }) {
  const { data: chatHistory } = api.chatRouter.getHistory.useQuery({
    chatSessionId,
  });

  if (!chatHistory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-2 pb-80">
      {chatHistory.map((message, index) => (
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
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
