"use client";

import { type Template, type ChatSession } from "@prisma/client";
import { DashboardHeaderH1 } from "~/app/dashboard/_components/layout";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import { type RouterOutputs } from "~/trpc/react";
import TemplateField from "./templateField";

export default function ChatHeader({
  template,
  chatSessions,
  currentChatSessionId,
}: {
  template: RouterOutputs["template"]["getOnePublicOrOwned"];
  chatSessions: ChatSession[];
  currentChatSessionId: string;
}) {
  const router = useRouter();
  const [showTemplateForm, setShowTemplateForm] = useState(true);
  const currentChatSession = chatSessions.find(
    (chatSession) => chatSession.id === currentChatSessionId,
  );

  if (!currentChatSession) {
    return null;
  }

  function handleChatSessionChange(chatSessionId: string) {
    router.push(`/template/${template.id}/${chatSessionId}`);
  }

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
        <DashboardHeaderH1>
          <div className="mr-6 flex flex-col">
            {template.name}
            <span className="text-sm font-normal text-gray-500">
              {template.description}
            </span>
          </div>
          <Menu>
            <MenuButton className="button shy">
              <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4 opacity-40" />
              {currentChatSession.title}
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-40" />
            </MenuButton>
            <MenuItems
              anchor="bottom start"
              className="z-50 !max-w-sm rounded-md bg-white p-1 shadow"
            >
              {chatSessions.map((chatSession) => (
                <MenuItem key={chatSession.id}>
                  <Button
                    className="button shy w-full !whitespace-normal border-none py-1"
                    onClick={() => {
                      handleChatSessionChange(chatSession.id);
                    }}
                  >
                    <div className="text-left">
                      <div>{chatSession.title}</div>
                      <div className="font-normal text-gray-500">
                        {chatSession.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </Button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </DashboardHeaderH1>
        <div className="ml-auto flex space-x-2">
          <button
            className="button shy border-none"
            onClick={() => setShowTemplateForm(!showTemplateForm)}
          >
            <ChevronDownIcon className="h-6 w-6 opacity-40" />
          </button>
        </div>
      </div>
      <div className={`border-t ${showTemplateForm ? "" : "hidden"}`}>
        <div className="mx-auto flex max-w-7xl flex-col space-y-2 px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {template.fields.map((field) => (
              <TemplateField key={field.id} field={field} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
