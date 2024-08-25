"use client";

import {
  Field,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Textarea,
} from "@headlessui/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import Spinner from "../spinner";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "@uidotdev/usehooks";

export default function PricingCalculator() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  const [output, setOutput] = useState("");
  const debouncedOutput = useDebounce(output, 500);

  const [model, setModel] = useState("gpt-4o-mini");

  const { data: price } = api.tokens.calculatePrice.useQuery({
    input: debouncedInput,
    output: debouncedOutput,
    model,
  });

  return (
    <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div className="flex flex-col rounded-2xl ring-1 ring-inset ring-gray-200">
        <div className="p-3 text-sm font-semibold text-white">
          <Field>
            <Textarea
              className="no-scrollbar block w-full rounded-lg border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:font-normal focus:bg-white"
              placeholder="Input"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </Field>
          <Field>
            <Textarea
              className="no-scrollbar mt-3 block w-full rounded-lg border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:font-normal focus:bg-white"
              placeholder="Output"
              rows={4}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              spellCheck={false}
            />
          </Field>
        </div>
        <Menu as="div" className="bg-indigo-600 p-3 pb-0">
          <MenuButton className="inline-flex w-full items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-white/20 data-[open]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white">
            Model: {model}
            <ChevronDownIcon className="ml-auto size-4 fill-white/60" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom start"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-indigo-500 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                onClick={() => setModel("gpt-4o")}
              >
                gpt-4o
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                onClick={() => setModel("gpt-4o-mini")}
              >
                gp-4o-mini
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
        {!price && (
          <div className="flex items-center justify-center rounded-b-2xl bg-indigo-600 p-6">
            <Spinner />
          </div>
        )}
        {price && (
          <div className="rounded-b-2xl bg-indigo-600 p-3">
            <table className="w-full rounded-lg bg-white/10 text-sm text-white">
              <tbody className="text-center">
                <tr>
                  <th></th>
                  <td className="px-3 py-2 text-indigo-100">Length</td>
                  <td className="px-3 py-2 text-indigo-100">Tokens</td>
                  <td className="px-3 py-2 text-right text-indigo-100">
                    Price
                  </td>
                </tr>
                <tr>
                  <td className="px-3 text-left text-indigo-100">Input</td>
                  <td className="px-3">{input.length}</td>
                  <td className="px-3">{price.inputTokens}</td>
                  <td className="px-3 text-right font-semibold">
                    {price.inputPrice.toFixed(3)} €
                  </td>
                </tr>
                <tr>
                  <td className="px-3 text-left text-indigo-100">Output</td>
                  <td className="px-3">{output.length}</td>
                  <td className="px-3">{price.outputTokens}</td>
                  <td className="px-3 text-right font-semibold">
                    {price.outputPrice.toFixed(3)} €
                  </td>
                </tr>
                <tr>
                  <td className="col-span-3 h-3" />
                </tr>
                <tr className="text-xl">
                  <td className="px-3 text-left">Total</td>
                  <td className="px-3 py-1">{input.length + output.length}</td>
                  <td className="px-3 py-1">
                    {price.inputTokens + price.outputTokens}
                  </td>
                  <td className="px-3 py-1 text-right font-bold">
                    {(price.inputPrice + price.outputPrice).toFixed(3)} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
