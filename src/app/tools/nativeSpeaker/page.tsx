"use client";

import {
  Button,
  Checkbox,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { useState } from "react";
import { type Result } from "~/server/api/routers/nativeSpeaker";
import { api } from "~/trpc/react";
import Spinner from "../../_components/spinner";
import { CheckIcon } from "@heroicons/react/20/solid";
import Markdown from "react-markdown";
import LanguageInput from "./_components/languageInput";
import ToneInput from "./_components/toneInput";
import LlmInput from "./_components/llmInput";

export default function NativeSpeakerPage() {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [tone, setTone] = useState("professional");
  const [numVariants, setNumVariants] = useState(1);
  const [customInstructions, setCustomInstructions] = useState("");
  const [llm, setLlm] = useState("gpt-4o-mini");
  const [variants, setVariants] = useState<Result["variants"]>([]);

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
    <div className="w-full grow bg-white">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Native Speaker Refinement</h1>
        <div className="text-gray-500">
          Refine your text with the quality of a native speaker.
        </div>
      </div>
      <div className="grid grid-cols-2">
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
                onChange={(event) =>
                  setNumVariants(parseInt(event.target.value))
                }
                min={1}
                max={3}
                className="input"
              />
            </Field>
            <Field className="flex flex-col md:col-span-2 lg:col-span-3">
              <Label className="mb-1 text-sm font-semibold">Text</Label>
              <Textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="input"
              />
            </Field>
          </div>
          <div className="mb-4">
            <Button
              onClick={handleSubmit}
              className="button"
              disabled={run.isPending || !text}
            >
              {run.isPending && <Spinner className="mr-2 h-5 w-5" />}
              Submit
            </Button>
          </div>
        </div>
        <div className="border-l p-4">
          <h2 className="mb-2 text-xl font-semibold">Refined Variants</h2>
          {variants.length > 0 ? (
            <div className="space-y-2">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="rounded-md border border-indigo-200 bg-indigo-50 p-3"
                >
                  <p className="text-sm">{variant}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-500">
              No variants generated yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
