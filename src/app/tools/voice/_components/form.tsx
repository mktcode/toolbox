"use client";

import {
  Field,
  Label,
  Description,
  Textarea,
  Button,
  Input,
  Select,
} from "@headlessui/react";
import Spinner from "~/app/_components/spinner";
import { type Session } from "next-auth";
import { useState } from "react";
import { type Output } from "~/server/api/routers/voice";
import { api } from "~/trpc/react";
import { type AvailableVoice, availableVoices } from "../_lib";

export default function Form({
  session,
  setOutput: setOutput,
}: {
  session: Session | null;
  setOutput: (output: Output) => void;
}) {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState<AvailableVoice>("onyx");
  const [speed, setSpeed] = useState(1);

  const run = api.voice.run.useMutation({
    async onSuccess(output) {
      setOutput(output);
    },
    onError(error) {
      console.error("Mutation failed:", error);
    },
  });

  function handleSubmit() {
    run.mutate({
      text,
      voice,
      speed,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Voice</Label>
          <Select
            value={voice}
            onChange={(event) => setVoice(event.target.value as AvailableVoice)}
            className="input"
          >
            {availableVoices.map((voice) => (
              <option key={voice} value={voice}>
                {voice}
              </option>
            ))}
          </Select>
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Speed</Label>
          <Description className="mb-1 text-sm text-gray-500">
            Enter a value between 0.25 and 4. (1 is normal speed)
          </Description>
          <Input
            value={speed}
            onChange={(event) => setSpeed(parseFloat(event.target.value))}
            type="number"
            className="input"
          />
        </Field>
        <Field className="flex flex-col md:col-span-2 lg:col-span-3">
          <Label className="mb-1 text-sm font-semibold">Text</Label>
          <Description className="mb-1 text-sm text-gray-500">
            Enter the text you want to convert to audio.
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
