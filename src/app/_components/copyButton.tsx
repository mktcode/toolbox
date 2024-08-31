import { Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function CopyButton({
  text,
  classNames,
  label,
}: {
  text: string;
  classNames?: string;
  label?: string;
}) {
  const [hasCopied, setHasCopied] = useState(false);

  function indicateSuccessfulCopy() {
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  }

  return (
    <CopyToClipboard text={text} onCopy={() => indicateSuccessfulCopy()}>
      <Button className={classNames}>
        {hasCopied ? (
          <>
            Copied!
            <CheckIcon className="ml-2 h-4 w-4 text-green-500" />
          </>
        ) : (
          <>
            {label}
            <DocumentDuplicateIcon className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
}
