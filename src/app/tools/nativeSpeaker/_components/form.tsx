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
import LanguageInput from "./languageInput";
import LlmInput from "./llmInput";
import ToneInput from "./toneInput";
import { type Session } from "next-auth";
import { useState } from "react";
import { type Output } from "~/server/api/routers/nativeSpeaker";
import { api } from "~/trpc/react";

export default function Form({ session }: { session: Session | null }) {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [tone, setTone] = useState("professional");
  const [numVariants, setNumVariants] = useState(1);
  const [customInstructions, setCustomInstructions] = useState("");
  const [llm, setLlm] = useState("gpt-4o-mini");
  const [variants, setVariants] = useState<Output["variants"]>([]);

  const run = api.nativeSpeaker.run.useMutation({
    onSuccess({ variants }) {
      setVariants(variants);
    },
  });

  function handleSubmit() {
    run.mutate({
      text,
      targetLanguage,
      tone,
      variants: numVariants,
      customInstructions,
      llm,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LanguageInput onChange={setTargetLanguage} />
        <ToneInput onChange={setTone} />
        <LlmInput onChange={setLlm} />
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
        <Field className="flex flex-col">
          <Label className="mb-1 text-sm font-semibold">
            Number of Variants
          </Label>
          <Input
            type="number"
            value={numVariants}
            onChange={(event) => setNumVariants(parseInt(event.target.value))}
            min={1}
            max={3}
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Text</Label>
          <Description className="mb-1 text-sm text-gray-500">
            Enter the text you want to refine. Can be written in any language.
            Output will be {targetLanguage}.
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
