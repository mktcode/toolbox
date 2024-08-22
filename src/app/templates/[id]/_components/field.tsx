import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { type RouterOutputs } from "~/trpc/react";

type FieldType = RouterOutputs["template"]["getOnePublic"]["fields"][0];
type OptionType = FieldType["options"][0];

export default function Field({ field }: { field: FieldType }) {
  const options = field.options;

  const [input, setInput] = useState(field.defaultValue);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  return (
    <Combobox
      value={selectedOption}
      onChange={(value) => {
        setSelectedOption(value);
        if (value) {
          setInput(value.value);
        }
      }}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg border-gray-300 py-1.5 pl-3 pr-8 text-sm/6 text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
          )}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        {options.length !== 0 && (
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
          </ComboboxButton>
        )}
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl border border-black/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
        )}
      >
        {options.map((option) => (
          <ComboboxOption
            key={option.id}
            value={option}
            className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white"
          >
            <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
            <div className="text-sm/6 text-black">{option.value}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
