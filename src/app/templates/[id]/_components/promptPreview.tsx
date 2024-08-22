import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PromptPreview({
  parsedTemplate,
}: {
  parsedTemplate: string;
}) {
  return (
    <Disclosure as="div" className="mt-3">
      <DisclosureButton className="button shy group flex w-full items-center justify-between">
        <span className="text-sm/6 font-medium">Prompt Preview</span>
        <ChevronDownIcon className="size-5 fill-black/60 group-data-[open]:rotate-180 group-data-[hover]:fill-black/50" />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
        <Markdown remarkPlugins={[remarkGfm]} className="space-y-2">
          {parsedTemplate}
        </Markdown>
      </DisclosurePanel>
    </Disclosure>
  );
}
