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
import { type Session } from "next-auth";
import { useState } from "react";
import { type Output } from "~/server/api/routers/shaper";
import { api } from "~/trpc/react";

export default function Form({ session }: { session: Session | null }) {
  const [productContext, setProductContext] = useState("");
  const [featureIdea, setFeatureIdea] = useState("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [llm, setLlm] = useState("gpt-4o-mini");
  const [results, setResults] = useState<Output[]>([]);

  const run = api.shaper.run.useMutation({
    onSuccess(results) {
      setResults(results);
    },
  });

  function handleSubmit() {
    run.mutate({
      productContext,
      featureIdea,
      customInstruction,
      llm,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Product Context</Label>
          <Description className="text-sm text-gray-500">
            Describe the product you're working on. You can paste a link to
            GitHub or any other public source.
          </Description>
          <Textarea
            value={productContext}
            onChange={(event) => setProductContext(event.target.value)}
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Feature Idea</Label>
          <Description className="text-sm text-gray-500">
            Describe the feature you're planning to implement. You can paste a
            link to a feature request or issue or any other public source. Can
            also be just a couple of notes.
          </Description>
          <Textarea
            value={featureIdea}
            onChange={(event) => setFeatureIdea(event.target.value)}
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">
            Custom Instructions
          </Label>
          <Input
            value={customInstruction}
            onChange={(event) => setCustomInstruction(event.target.value)}
            className="input"
          />
        </Field>
      </div>
      <div className="mb-4">
        {session ? (
          <Button
            onClick={handleSubmit}
            className="button"
            disabled={run.isPending || !productContext || !featureIdea}
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
