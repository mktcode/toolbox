"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={open} className="button mini">
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
        <span className="ml-2">Feedback</span>
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
              className="data-[closed]:transform-[scale(95%)] w-full max-w-xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle as="h2">What do you think?</DialogTitle>
              <Textarea
                className="mt-3 w-full rounded-lg border-none bg-gray-50 p-3"
                placeholder="Your feedback..."
                rows={6}
                required
              />
              <div className="mt-4 flex justify-between">
                <Field className="flex !cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={isPublic}
                    onChange={setIsPublic}
                    className="group block size-6 rounded border-2 border-indigo-500 bg-white p-0.5 data-[checked]:bg-indigo-500"
                  >
                    <CheckIcon className="h-4 w-4 text-white" />
                  </Checkbox>
                  <Label className="flex cursor-pointer flex-col leading-4">
                    <span>Make public</span>
                    <span className="text-xs text-gray-500">
                      Will be included in AI summary.
                    </span>
                  </Label>
                </Field>
                <Button className="button" onClick={close}>
                  Submit feedback
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
