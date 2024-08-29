"use client";

import {
  Field,
  Checkbox,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  SparklesIcon,
  UserIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { type CoreMessage } from "ai";
import { useState } from "react";
import Spinner from "~/app/_components/spinner";
import { api } from "~/trpc/react";

const messageTypeOptions = [
  { value: "user", label: "User", icon: UserIcon, description: "That's you." },
  {
    value: "assistant",
    label: "Assistant",
    icon: SparklesIcon,
    description:
      "Add messages as the assistant. You can also edit the ones in the chat history anytime.",
  },
  {
    value: "system",
    label: "Instruction",
    icon: Cog6ToothIcon,
    description:
      "Setup for the conversation or inject extra instructions anytime.",
  },
] as const;

type MessageType = (typeof messageTypeOptions)[number];

export default function NewMessageInput({
  chatSessionId,
  onSubmit,
  onAddMessage,
}: {
  chatSessionId: string;
  onSubmit: (messages: CoreMessage[]) => void;
  onAddMessage: (message: CoreMessage) => void;
}) {
  const [text, setText] = useState("");
  const [isWebsearchEnabled, setIsWebsearchEnabled] = useState(true);
  const [messageType, setMessageType] = useState<MessageType>(
    messageTypeOptions[0],
  );
  const [submitMode, setSubmitMode] = useState<"add" | "respond">("add");

  const addMessage = api.chatRouter.addMessage.useMutation({
    onSuccess(message) {
      onAddMessage(message as CoreMessage);
    },
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200 to-transparent">
      <div className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-md shadow-md transition-all">
          <div className="relative">
            <textarea
              className="block w-full resize-none rounded-md rounded-b-none border-none p-6 text-lg placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400 focus:placeholder:text-gray-300"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Chat with the AI ..."
            />
            <Button className="button shy mini absolute right-1 top-1 border-none py-1 !font-normal opacity-50 hover:opacity-100">
              <TableCellsIcon className="mr-2 h-4 w-4 opacity-40" />
              Use Template
            </Button>
          </div>
          <div className="flex rounded-b-md bg-gray-100 p-2">
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <MicrophoneIcon className="h-6 w-6 text-gray-400" />
            </button>
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <PaperClipIcon className="h-6 w-6 text-gray-400" />
            </button>
            <Field className="flex !cursor-pointer items-center gap-3 px-2">
              <Checkbox
                checked={isWebsearchEnabled}
                onChange={setIsWebsearchEnabled}
                className="group block size-6 rounded border-2 border-gray-400 p-0.5 data-[checked]:bg-gray-400"
              >
                <CheckIcon className="h-4 w-4 text-gray-200" />
              </Checkbox>
              <Label className="flex cursor-pointer flex-col leading-4 text-gray-600">
                <span>Websearch</span>
              </Label>
            </Field>
            <div className="ml-auto flex space-x-2">
              <Menu>
                <MenuButton className="button shy !border-indigo-100">
                  <span className="mr-1 font-normal text-gray-400">as:</span>
                  <messageType.icon className="mr-1 h-4 w-4 opacity-40" />
                  {messageType.label}
                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-40" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="!max-w-sm rounded-md bg-white p-1 shadow"
                >
                  {messageTypeOptions.map((option) => (
                    <MenuItem key={option.value}>
                      <Button
                        className="button shy w-full !whitespace-normal border-none py-1"
                        onClick={() => {
                          setMessageType(option);
                        }}
                      >
                        <div>
                          <option.icon className="mr-2 h-4 w-4 opacity-40" />
                        </div>
                        <div className="text-left">
                          <div>{option.label}</div>
                          <div className="font-normal text-gray-500">
                            {option.description}
                          </div>
                        </div>
                      </Button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <div className="flex">
                {submitMode === "add" && (
                  <Button
                    className="button !rounded-r-none"
                    disabled={addMessage.isPending || !text}
                    onClick={() => {
                      addMessage.mutate({
                        chatSessionId,
                        role: messageType.value,
                        content: text,
                      });
                      setText("");
                    }}
                  >
                    {addMessage.isPending ? (
                      <Spinner className="mr-2 h-4 w-4 opacity-40" />
                    ) : (
                      <PlusIcon className="mr-2 h-4 w-4 opacity-40" />
                    )}
                    Add to Chat
                  </Button>
                )}
                {submitMode === "respond" && (
                  <Button
                    className="button !rounded-r-none"
                    disabled={!text}
                    onClick={() => {
                      onSubmit([
                        {
                          role: messageType.value,
                          content: text,
                        },
                      ]);
                      setText("");
                    }}
                  >
                    <SparklesIcon className="mr-2 h-4 w-4 opacity-40" />
                    Get Response
                  </Button>
                )}
                <Menu>
                  <MenuButton className="button !rounded-l-none">
                    <ChevronDownIcon className="h-4 w-4 opacity-40" />
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    className="!max-w-sm rounded-md bg-white p-1 shadow"
                  >
                    <MenuItem>
                      <Button
                        className="button shy w-full !whitespace-normal border-none py-1"
                        onClick={() => {
                          setSubmitMode("add");
                        }}
                      >
                        <div>
                          <PlusIcon className="mr-2 h-4 w-4 opacity-40" />
                        </div>
                        <div className="text-left">
                          <div>Add to Chat</div>
                          <div className="font-normal text-gray-500">
                            Add the message to the chat history without
                            generating a response.
                          </div>
                        </div>
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        className="button shy w-full !whitespace-normal border-none py-1"
                        onClick={() => {
                          setSubmitMode("respond");
                        }}
                      >
                        <div>
                          <SparklesIcon className="mr-2 h-4 w-4 opacity-40" />
                        </div>
                        <div className="text-left">
                          <div>Get Response</div>
                          <div className="font-normal text-gray-500">
                            Add the message (or leave it empty) and generate an
                            assistant response.
                          </div>
                        </div>
                      </Button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
