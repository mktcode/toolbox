"use client";

import { Button } from "@headlessui/react";
import { MicrophoneIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { type CoreMessage } from "ai";
import { useState } from "react";

export default function NewMessageInput({
  onSubmit,
}: {
  onSubmit: (message?: CoreMessage) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200 to-transparent">
      <div className="mx-auto flex w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-md shadow-md transition-all">
          <textarea
            className="block w-full resize-none rounded-md rounded-b-none border-none p-6 text-lg placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400 focus:placeholder:text-gray-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Chat with the AI ..."
          />
          <div className="flex rounded-b-md bg-gray-100 p-2">
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <MicrophoneIcon className="h-6 w-6 text-gray-400" />
            </button>
            <button className="rounded-md px-4 py-2 hover:bg-gray-200">
              <PaperClipIcon className="h-6 w-6 text-gray-400" />
            </button>
            <div className="ml-auto flex space-x-2">
              <div className="flex">
                <Button
                  className="button"
                  disabled={!text}
                  onClick={() => {
                    if (text) {
                      onSubmit({
                        role: "user",
                        content: text,
                      });
                      setText("");
                    } else {
                      onSubmit();
                    }
                  }}
                >
                  <PaperAirplaneIcon className="mr-2 h-4 w-4 opacity-40" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
