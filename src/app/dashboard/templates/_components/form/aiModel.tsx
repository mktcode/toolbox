import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useTemplateForm, {
  type TemplateWithFields,
} from "../../_lib/useTemplateForm";

const models = [
  {
    id: "gpt-4o",
    name: "Balanced",
    price: "~2ct",
    description:
      "GPT4o is a small model with a good balance of speed and capabilities.",
  },
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
];

export function AiModel({ template }: { template?: TemplateWithFields }) {
  const { aiModel, setAiModel } = useTemplateForm(template);

  return (
    <>
      <legend className="mt-6 font-semibold leading-6 text-gray-900">
        Intelligence &amp; Cost
      </legend>
      <p className="mb-6 mt-1 text-sm leading-6 text-gray-500">
        Choose the AI model that powers this template by default. The price is
        an estimate per run. Users can still choose the model when using the
        template and you can compare the results from all models easily and
        change this setting at any time.
      </p>
      <RadioGroup
        value={aiModel}
        onChange={setAiModel}
        aria-label="AI Model"
        className="flex w-full space-x-2"
      >
        {models.map((model) => (
          <Radio
            key={model.id}
            value={model.id}
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
    </>
  );
}
