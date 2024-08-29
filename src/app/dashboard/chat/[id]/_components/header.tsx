"use client";

import { type ChatSession } from "@prisma/client";
import {
  DashboardHeader,
  DashboardHeaderH1,
} from "./../../../_components/layout";
import { api } from "~/trpc/react";
import Spinner from "~/app/_components/spinner";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  chatSessions,
  currentChatSessionId,
}: {
  chatSessions: ChatSession[];
  currentChatSessionId: string;
}) {
  const router = useRouter();
  const createChatSession = api.chatRouter.createSession.useMutation({
    onSuccess: (data) => {
      router.push(`/dashboard/chat/${data.id}`);
    },
  });
  const deleteSession = api.chatRouter.deleteOwnedSession.useMutation({
    onSuccess: () => {
      router.push("/dashboard/chat");
    },
  });

  function handleChatSessionChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const chatSessionId = event.target.value;
    router.push(`/dashboard/chat/${chatSessionId}`);
  }

  return (
    <DashboardHeader>
      <DashboardHeaderH1>
        {chatSessions.length > 0 && (
          <select
            value={currentChatSessionId}
            onChange={handleChatSessionChange}
            className="mr-3 w-full rounded-xl border border-gray-200 py-1 text-3xl font-bold tracking-tight"
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
        <button className="button" onClick={() => createChatSession.mutate()}>
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
