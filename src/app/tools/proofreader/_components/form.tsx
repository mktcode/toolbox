"use client";

import {
  Field,
  Label,
  Description,
  Textarea,
  Button,
  Input,
} from "@headlessui/react";
import Spinner from "~/app/_components/spinner";
import LlmInput from "./llmInput";
import { type Session } from "next-auth";
import { useState } from "react";
import { type Output } from "~/server/api/routers/proofreader";
import { api } from "~/trpc/react";
import RefineInputButton from "../../_components/refineInputButton";

export default function Form({
  session,
  setOutput,
}: {
  session: Session | null;
  setOutput: (output: Output) => void;
}) {
  const [text, setText] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [llm, setLlm] = useState("gpt-4o-mini");

  const run = api.proofreader.run.useMutation({
    onSuccess(output) {
      setOutput(output);
    },
  });

  function handleSubmit() {
    run.mutate({
      text,
      customInstructions,
      llm,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LlmInput onChange={setLlm} />
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">
            Custom Instructions
          </Label>
          <div className="relative">
            <Input
              value={customInstructions}
              onChange={(event) => setCustomInstructions(event.target.value)}
              className="input pr-8"
            />
            <RefineInputButton
              text={customInstructions}
              context="Native Speaker Tool: Translate and refine your texts with the quality of a native speaker."
              label="Custom Instructions"
              setter={setCustomInstructions}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform text-indigo-500"
            />
          </div>
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Text</Label>
          <Description className="mb-1 text-sm text-gray-500">
            Enter the text you want get proofread.
          </Description>
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="input"
          />
        </Field>
      </div>
      <div className="mb-4">
        {session ? (
          <Button
            onClick={handleSubmit}
            className="button"
            disabled={run.isPending || !text}
          >
            {run.isPending && <Spinner className="mr-2 h-5 w-5" />}
            Submit
          </Button>
        ) : (
          <div className="text-sm text-gray-500">
            Please sign in to use this tool.
          </div>
        )}
      </div>
    </div>
  );
}
