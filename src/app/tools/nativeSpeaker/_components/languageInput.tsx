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

type Language = {
  id: number;
  name: string;
  flag: string;
};

const defaultLanguage = { id: 1, name: "English", flag: "🇺🇸" };
const top10Languages: Language[] = [
  defaultLanguage,
  { id: 2, name: "Spanish", flag: "🇪🇸" },
  { id: 3, name: "French", flag: "🇫🇷" },
  { id: 4, name: "German", flag: "🇩🇪" },
  { id: 5, name: "Italian", flag: "🇮🇹" },
  { id: 6, name: "Portuguese", flag: "🇵🇹" },
  { id: 7, name: "Dutch", flag: "🇳🇱" },
  { id: 8, name: "Russian", flag: "🇷🇺" },
  { id: 9, name: "Chinese", flag: "🇨🇳" },
  { id: 10, name: "Japanese", flag: "🇯🇵" },
];

export default function LanguageInput({
  onChange,
}: {
  onChange: (language: string) => void;
}) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(defaultLanguage);
  const [query, setQuery] = useState("");

  const filteredLanguages =
    query === ""
      ? top10Languages
      : top10Languages.filter((language) => {
          return language.name.toLowerCase().includes(query.toLowerCase());
        });

  function handleOnChange(language: Language | null) {
    if (!language) return;

    setSelectedLanguage(language);
    onChange(language.name);
  }

  return (
    <Field className="flex flex-col">
      <Label className="mb-1 text-sm font-semibold">Target Language</Label>
      <Combobox
        value={selectedLanguage}
        onChange={handleOnChange}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(language: Language) => language.name}
            onChange={(event) => setQuery(event.target.value)}
            className="input"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 flex items-center px-2.5">
            {selectedLanguage.flag}
            <ChevronDownIcon className="ml-1 size-4 fill-gray-400 group-data-[hover]:fill-gray-600" />
          </ComboboxButton>
        </div>
        <ComboboxOptions anchor="bottom end" className="combobox-options">
          {query !== "" && filteredLanguages.length === 0 && (
            <ComboboxOption
              value={{ id: 0, name: query, flag: "" }}
              className="combobox-option"
            >
              {query}
            </ComboboxOption>
          )}
          {filteredLanguages.map((language) => (
            <ComboboxOption
              key={language.id}
              value={language}
              className="combobox-option"
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
