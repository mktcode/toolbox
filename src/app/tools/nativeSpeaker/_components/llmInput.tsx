import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type Llm = {
  id: number;
  name: string;
};

const defaultLlm = { id: 1, name: "gpt-4o-mini" };
const llms: Llm[] = [defaultLlm, { id: 2, name: "gpt-4o" }];

export default function LlmInput({
  onChange,
}: {
  onChange: (llm: string) => void;
}) {
  const [selectedLlm, setSelectedLlm] = useState<Llm>(defaultLlm);
  const [query, setQuery] = useState("");

  const filteredLlms =
    query === ""
      ? llms
      : llms.filter((llm) => {
          return llm.name.toLowerCase().includes(query.toLowerCase());
        });

  function handleOnChange(llm: Llm | null) {
    if (!llm) return;

    setSelectedLlm(llm);
    onChange(llm.name);
  }

  return (
    <Field className="flex flex-col">
      <Label className="mb-1 text-sm font-semibold">Large Language Model</Label>
      <Combobox
        value={selectedLlm}
        onChange={handleOnChange}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(language: Llm) => language.name}
            onChange={(event) => setQuery(event.target.value)}
            className="input"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-gray-400 group-data-[hover]:fill-gray-600" />
          </ComboboxButton>
        </div>
        <ComboboxOptions anchor="bottom end" className="combobox-options">
          {query !== "" && filteredLlms.length === 0 && (
            <ComboboxOption
              value={{ id: 0, name: query }}
              className="combobox-option"
            >
              {query}
            </ComboboxOption>
          )}
          {filteredLlms.map((llm) => (
            <ComboboxOption
              key={llm.id}
              value={llm}
              className="combobox-option"
            >
              {llm.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
