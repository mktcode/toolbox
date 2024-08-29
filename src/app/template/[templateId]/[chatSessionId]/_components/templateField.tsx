import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Prisma, type TemplateField } from "@prisma/client";
import { useState } from "react";

type FieldWithOptions = Prisma.TemplateFieldGetPayload<{
  include: { options: true };
}>;

export default function TemplateField({ field }: { field: FieldWithOptions }) {
  const [query, setQuery] = useState(field.defaultValue);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Field>
      <Label className="text-sm font-medium text-gray-700">{field.name}</Label>
      <Description className="text-sm text-gray-500">
        {field.description}
      </Description>
      {field.type === "text" && (
        <Textarea
          className="mt-1 block w-full border-gray-300 bg-white"
          defaultValue={field.defaultValue}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      {field.type === "combobox" && (
        <Combobox
          immediate
          value={selected ?? query}
          onChange={(value) => setSelected(value)}
        >
          <div className="relative mt-1">
            <ComboboxInput
              className="w-full rounded-md border border-gray-300 py-1 pl-2 pr-8 focus:outline-none"
              defaultValue={field.defaultValue}
              displayValue={(option: string) => option}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="size-4 opacity-40" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            transition
            className="z-50 w-[var(--input-width)] rounded-xl border bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0"
          >
            {query.length > 0 &&
              !field.options.some((option) => option.value === query) && (
                <ComboboxOption
                  value={query}
                  className="group flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1"
                >
                  {query}
                </ComboboxOption>
              )}
            {field.options.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option.value}
                className="group flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1"
              >
                {option.value}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      )}
    </Field>
  );
}
