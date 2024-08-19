"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Fields } from "./fields";
import useNewTemplate from "../_lib/useNewTemplate";
import Prompt from "./prompt";

export default function NewTemplateForm() {
  const { description, setDescription } = useNewTemplate();

  const models = [
    {
      id: "gpt-4o-mini",
      name: "Cheapest",
      price: "~1ct",
      description:
        "GPT4o-mini is a small, fast but capable model for many simple tasks.",
    },
    {
      id: "gpt-4o-large",
      name: "Smartest",
      price: "~5ct",
      description:
        "GPT4o-large is a medium-sized model with increased reasoning capabilities.",
    },
    {
      id: "gpt-4o",
      name: "Balanced",
      price: "~2ct",
      description:
        "GPT4o is a small model with a good balance of speed and capabilities.",
    },
  ];

  const [selected, setSelected] = useState(models[0]);

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <label
          htmlFor="about"
          className="block font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <p className="text-sm leading-6 text-gray-500">
          Explain what the template does in a few words or sentences.
        </p>
        <div className="mb-6 mt-2">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="relative flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor="comments" className="font-medium text-gray-900">
              Make public
            </label>
            <p className="text-gray-500">
              Allow everyone to use this template. You can always change this
              later.
            </p>
          </div>
        </div>

        <legend className="mt-6 font-semibold leading-6 text-gray-900">
          Intelligence &amp; Cost
        </legend>
        <p className="mb-6 mt-1 text-sm leading-6 text-gray-500">
          Choose the AI model that powers this template. The price is an
          estimate per run.
        </p>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="AI Model"
          className="flex w-full space-x-2"
        >
          {models.map((model) => (
            <Radio
              key={model.name}
              value={model}
              className="group relative flex cursor-pointer rounded-lg border px-5 py-4 transition focus:outline-none data-[checked]:border-indigo-600 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <div className="flex w-full items-center justify-between">
                <div className="pr-3 text-sm/6">
                  <div className="flex">
                    <div className="font-semibold">{model.name}</div>
                    <div className="ml-3 text-gray-400">{model.price}</div>
                  </div>
                  <div className="text-gray-400">{model.description}</div>
                </div>
                <CheckCircleIcon className="size-10 text-indigo-600 opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>

        <Fields />
        <Prompt />

        <label
          htmlFor="about"
          className="mt-6 block font-medium leading-6 text-gray-900"
        >
          Response Schema
        </label>
        <p className="text-sm leading-6 text-gray-500">
          Write the prompt and use <code>{"{{field_name}}"}</code> to insert
          dynamic content from form fields.
        </p>
        <div className="relative mt-3 flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="structuredResponse"
              name="structuredResponse"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="text-sm leading-6">
            <label
              htmlFor="structuredResponse"
              className="font-medium text-gray-900"
            >
              Use structured response
            </label>
            <p className="text-gray-500">
              Define a JSON schema that the response should adhere to.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}