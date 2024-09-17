import { api } from "~/trpc/server";
import PricingCalculator from "./pricingCalculator";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

function formattedPrice(pricePerToken: number, margin: number) {
  const price = pricePerToken * 1_000_000;
  const priceWithMargin = price * (1 + margin / 100);
  const decimals = priceWithMargin < 1 ? 3 : 2;
  return priceWithMargin.toFixed(decimals);
}

export default async function Pricing() {
  const llmProviders = await api.llmProviders.all();

  const defaultLlmProvider = llmProviders[0];
  if (!defaultLlmProvider) {
    return null;
  }
  const defaultLlm = defaultLlmProvider.llms[0];
  if (!defaultLlm) {
    return null;
  }

  return (
    <>
      <a id="pricing" className="block h-0" />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pricing
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <div className="grid grid-cols-3 gap-4">
                <div />
                <div className="text-sm font-semibold">Pricing</div>
                <div className="text-sm font-semibold">Batch Pricing</div>
              </div>
              {llmProviders.map((provider) => (
                <>
                  <div className="flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                      {provider.name}
                    </h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>
                  <div className="space-x-3 text-gray-400">
                    <Link
                      href={provider.url}
                      className="text-sm"
                      target="_blank"
                    >
                      Website
                      <ArrowTopRightOnSquareIcon className="ml-1 inline-block h-4 w-4 opacity-40" />
                    </Link>
                    <Link
                      href={provider.pricingUrl}
                      className="text-sm"
                      target="_blank"
                    >
                      Pricing
                      <ArrowTopRightOnSquareIcon className="ml-1 inline-block h-4 w-4 opacity-40" />
                    </Link>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {provider.llms.map((llm) => (
                      <>
                        <div>{llm.label}</div>
                        <div className="text-sm text-gray-600">
                          ${formattedPrice(llm.priceIn, llm.margin)} / 1M input
                          tokens
                          <br />${formattedPrice(llm.priceOut, llm.margin)} / 1M
                          output tokens
                        </div>
                        <div className="text-sm text-gray-600">
                          ${formattedPrice(llm.priceInBatch, llm.margin)} / 1M
                          input tokens
                          <br />${formattedPrice(
                            llm.priceOutBatch,
                            llm.margin,
                          )}{" "}
                          / 1M output tokens
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ))}
            </div>
            <PricingCalculator
              llmProviders={llmProviders}
              defaultLlm={defaultLlm}
            />
          </div>
        </div>
      </div>
    </>
  );
}
