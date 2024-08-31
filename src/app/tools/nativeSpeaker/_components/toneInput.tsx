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

type Tone = {
  id: number;
  name: string;
};

const defaultTone = { id: 1, name: "Formal" };
const tones: Tone[] = [defaultTone, { id: 2, name: "Informal" }];

export default function ToneInput({
  onChange,
}: {
  onChange: (tone: string) => void;
}) {
  const [selectedTone, setSelectedTone] = useState<Tone>(defaultTone);
  const [query, setQuery] = useState("");

  const filteredTones =
    query === ""
      ? tones
      : tones.filter((tone) => {
          return tone.name.toLowerCase().includes(query.toLowerCase());
        });

  function handleOnChange(tone: Tone | null) {
    if (!tone) return;

    setSelectedTone(tone);
    onChange(tone.name);
  }

  return (
    <Field className="flex flex-col">
      <Label className="mb-1 text-sm font-semibold">Tone</Label>
      <Combobox
        value={selectedTone}
        onChange={handleOnChange}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(language: Tone) => language.name}
            onChange={(event) => setQuery(event.target.value)}
            className="input"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-gray-400 group-data-[hover]:fill-gray-600" />
          </ComboboxButton>
        </div>
        <ComboboxOptions anchor="bottom end" className="combobox-options">
          {query !== "" && filteredTones.length === 0 && (
            <ComboboxOption
              value={{ id: 0, name: query }}
              className="combobox-option"
            >
              {query}
            </ComboboxOption>
          )}
          {filteredTones.map((tone) => (
            <ComboboxOption
              key={tone.id}
              value={tone}
              className="combobox-option"
            >
              {tone.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
