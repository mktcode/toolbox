import { api } from "~/trpc/server";
import PricingCalculator from "./pricingCalculator";

export default async function Pricing() {
  const llmProviders = await api.llmProvidersRouter.all();

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
              Simple no-tricks pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              I currently add a 50% margin to the price of the AI providers
              being used.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                No subscription. Pay per use.
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                I do not plan to offer any subscription model, ever. I want to
                keep it simple and not artificially restict any features.
                Topping up your balance as you need is all you need to do. yet.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4">
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
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {provider.llms.map((llm) => (
                      <>{llm.name}</>
                    ))}
                    <div>GPT-4o-mini</div>
                    <div className="text-sm text-gray-600">
                      $0.23 / 1M input tokens
                      <br />
                      $0.90 / 1M output tokens
                    </div>
                    <div className="text-sm text-gray-600">
                      $0.10 / 1M input tokens
                      <br />
                      $0.45 / 1M output tokens
                    </div>
                    <div>GPT-4o</div>
                    <div className="text-sm text-gray-600">
                      $5.00 / 1M input tokens
                      <br />
                      $15.00 / 1M output tokens
                    </div>
                    <div className="text-sm text-gray-600">
                      $2.50 / 1M input tokens
                      <br />
                      $7.50 / 1M output tokens
                    </div>
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
