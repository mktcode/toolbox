"use client";

import NewMessageInput from "./newMessageInput";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Prisma, ChatMessageRole } from "@prisma/client";
import { type CoreMessage } from "ai";
import Message from "./message";
import { Transition } from "@headlessui/react";

export default function Chat({
  chatSession,
}: {
  chatSession: Prisma.ChatSessionGetPayload<{
    include: { chatMessages: true };
  }>;
}) {
  const [messages, setMessages] = useState<CoreMessage[]>(
    chatSession.chatMessages as CoreMessage[],
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
      <div className="flex flex-col space-y-4 pb-80">
        {messages.map((message, index) => (
          <Transition
            key={index}
            appear
            show={true}
            as="div"
            className="transition duration-300 ease-in data-[closed]:opacity-0"
          >
            <Message message={message} />
          </Transition>
        ))}
      </div>
      <NewMessageInput
        chatSessionId={chatSession.id}
        onSubmit={(message?: CoreMessage) => {
          if (message) {
            setMessages([...messages, message]);
            respondMutation.mutate({
              chatSessionId: chatSession.id,
              message: {
                role: message.role,
                content: message.content as string,
              },
            });
          } else {
            respondMutation.mutate({
              chatSessionId: chatSession.id,
            });
          }
        }}
        onAddMessage={(message) => {
          setMessages([...messages, message]);
        }}
      />
    </main>
  );
}
