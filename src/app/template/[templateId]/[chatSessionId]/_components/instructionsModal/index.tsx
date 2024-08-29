"use client";

import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { type RouterOutputs } from "~/trpc/react";

type Template = RouterOutputs["template"]["getAllPublic"][0];

export default function InstructionsModal({
  onChange,
}: {
  onChange: (instructions: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [instructions, setInstructions] = useState("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="button shy !border-gray-200 hover:!border-indigo-100"
      >
        <Cog6ToothIcon className="mr-2 h-4 w-4" />
        Instructions
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] relative w-full max-w-xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle as="h2" className="text-center text-lg font-medium">
                Instructions for this Chat
              </DialogTitle>
              <div className="mt-4 space-y-4">
                <Field>
                  <Description className="text-sm text-gray-500">
                    Give the assistant specific instructions for this chat, a
                    profession, tone, or other guidance.
                  </Description>
                  <Textarea
                    className="mt-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    rows={3}
                  />
                </Field>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
