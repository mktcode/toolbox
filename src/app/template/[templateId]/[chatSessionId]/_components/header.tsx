"use client";

import { type Template, type ChatSession } from "@prisma/client";
import {
  DashboardHeader,
  DashboardHeaderH1,
} from "~/app/dashboard/_components/layout";
import { api } from "~/trpc/react";
import Spinner from "~/app/_components/spinner";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  template,
  chatSessions,
  currentChatSessionId,
}: {
  template: Template;
  chatSessions: ChatSession[];
  currentChatSessionId: string;
}) {
  const router = useRouter();
  const createChatSession = api.chatRouter.createSession.useMutation({
    onSuccess: (chatSession) => {
      router.push(`/template/${template.id}/${chatSession.id}`);
    },
  });
  const deleteSession = api.chatRouter.deleteOwnedSession.useMutation({
    onSuccess: () => {
      router.push(`/template/${template.id}`);
    },
  });

  function handleChatSessionChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const chatSessionId = event.target.value;
    router.push(`/template/${template.id}/${chatSessionId}`);
  }

  return (
    <DashboardHeader>
      <DashboardHeaderH1>
        <div className="flex flex-col">
          {template.name}
          <span className="text-sm font-normal text-gray-500">
            {template.description}
          </span>
        </div>
      </DashboardHeaderH1>
      <DashboardHeaderH1>
        {chatSessions.length > 0 && (
          <select
            value={currentChatSessionId}
            onChange={handleChatSessionChange}
            className="mr-3 w-full rounded-lg border border-gray-100 py-1 text-xl font-semibold tracking-tight"
          >
            {chatSessions.map((chatSession) => (
              <option key={chatSession.id} value={chatSession.id}>
                {chatSession.title}
              </option>
            ))}
          </select>
        )}
      </DashboardHeaderH1>
      <div className="ml-auto flex space-x-2">
        <button
          className="button shy"
          onClick={() =>
            deleteSession.mutate({ chatSessionId: currentChatSessionId })
          }
        >
          {deleteSession.isPending && (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Delete Chat
            </>
          )}
          {!deleteSession.isPending && (
            <>
              <TrashIcon className="mr-2 h-4 w-4 opacity-40" />
              Delete Chat
            </>
          )}
        </button>
        <button
          className="button"
          onClick={() => createChatSession.mutate({ templateId: template.id })}
        >
          {createChatSession.isPending && (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              New Chat
            </>
          )}
          {!createChatSession.isPending && (
            <>
              <PlusIcon className="mr-2 h-4 w-4 opacity-40" />
              New Chat
            </>
          )}
        </button>
      </div>
    </DashboardHeader>
  );
}
