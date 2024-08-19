"use client";

import { Fields } from "./fields";
import useTemplateForm from "../../_lib/useTemplateForm";
import Prompt from "./prompt";
import { AiModel } from "../../_components/form/aiModel";

export default function NewTemplateForm() {
  const { description, setDescription, isPublic, setIsPublic } =
    useTemplateForm();

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

        <label
          htmlFor="comments"
          className="relative flex cursor-pointer gap-x-3 rounded-lg border p-3"
        >
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </div>
          <div className="text-sm leading-6">
            <div className="font-medium text-gray-900">Make public</div>
            <p className="text-gray-500">
              Allow everyone to use this template. You can always change this
              later.
            </p>
          </div>
        </label>

        <AiModel />
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
