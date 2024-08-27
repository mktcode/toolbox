"use client";

import { Field, Checkbox, Label } from "@headlessui/react";
import {
  CheckIcon,
  MicrophoneIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NewMessageInput({
  onSubmit,
}: {
  onSubmit: (message: { content: string }) => void;
}) {
  const [text, setText] = useState("");
  const [isWebsearchEnabled, setIsWebsearchEnabled] = useState(true);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200 to-transparent">
      <div className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-md shadow-md transition-all">
          <textarea
            className="block w-full resize-none rounded-md rounded-b-none border-none p-6 text-lg focus:border-gray-400 focus:ring-gray-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Chat with the AI ..."
          />
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
              <button className="button shy">
                <PencilSquareIcon className="mr-2 h-4 w-4" />
                No Template
              </button>
              <button
                className="button"
                onClick={() => {
                  onSubmit({ content: text });
                  setText("");
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
