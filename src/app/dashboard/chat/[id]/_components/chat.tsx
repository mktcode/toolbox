"use client";

import Messages from "./messages";
import NewMessageInput from "./newMessageInput";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Prisma, ChatMessageRole } from "@prisma/client";

export default function Chat({
  chatSession,
}: {
  chatSession: Prisma.ChatSessionGetPayload<{
    include: { chatMessages: true };
  }>;
}) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    chatSession.chatMessages,
  );

  const respondMutation = api.chatRouter.respond.useMutation({
    async onSuccess(tokenStream) {
      let newMessageContent = "";
      for await (const value of tokenStream) {
        newMessageContent += value;

        setMessages([
          ...messages,
          {
            role: ChatMessageRole.assistant,
            content: newMessageContent,
          },
        ]);
      }
    },
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
      <Messages messages={messages} />
      <NewMessageInput
        onSubmit={(message: { content: string }) => {
          setMessages([
            ...messages,
            {
              role: ChatMessageRole.user,
              content: message.content,
            },
          ]);
          respondMutation.mutate({
            chatSessionId: chatSession.id,
            message,
          });
        }}
      />
    </main>
  );
}
