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
import { type Output } from "~/server/api/routers/dontForget";
import { api } from "~/trpc/react";

export default function Form({
  session,
  setOutput: setOutput,
}: {
  session: Session | null;
  setOutput: (output: Output) => void;
}) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("Feature Development");
  const [customInstructions, setCustomInstructions] = useState("");
  const [llm, setLlm] = useState("gpt-4o-mini");

  const run = api.dontForget.run.useMutation({
    onSuccess(output) {
      setOutput(output);
    },
  });

  function handleSubmit() {
    run.mutate({
      text,
      topic,
      customInstructions,
      llm,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LlmInput onChange={setLlm} />
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Topic</Label>
          <Input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">
            Custom Instructions
          </Label>
          <Input
            value={customInstructions}
            onChange={(event) => setCustomInstructions(event.target.value)}
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Text</Label>
          <Description className="mb-1 text-sm text-gray-500">
            Enter the text you want to refine.
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
