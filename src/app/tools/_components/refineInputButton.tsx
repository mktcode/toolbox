"use client";

import { Button } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Spinner from "~/app/_components/spinner";
import { api } from "~/trpc/react";

type Props = {
  text: string;
  label: string;
  description?: string;
  context?: string;
  setter: (text: string) => void;
  className?: string;
};

export default function RefineInputButton({
  text,
  label,
  description,
  context,
  setter,
  className,
}: Props) {
  const run = api.refineInput.run.useMutation({
    onSuccess({ refinedInputText }) {
      setter(refinedInputText);
    },
  });

  function handleSubmit() {
    if (!text) return;

    run.mutate({
      text,
      label,
      description,
      context,
    });
  }

  return (
    <Button
      className={`cursor-pointer disabled:cursor-default disabled:opacity-30 ${className}`}
      onClick={handleSubmit}
      disabled={!text || run.isPending}
    >
      {run.isPending ? (
        <Spinner className="h-5 w-5 !text-indigo-500" />
      ) : (
        <SparklesIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
