export default function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            I currently add a 50% margin to the price of the AI providers being
            used.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              No subscription. Pay per use.
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              I do not plan to offer any subscription model, ever. I want to
              keep it simple and not artificially restict any features. Topping
              up your balance as you need is all you need to do. yet.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div />
              <div className="text-sm font-semibold text-gray-600">Pricing</div>
              <div className="text-sm font-semibold text-gray-600">
                Batch Pricing
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                OpenAI
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>GPT-4o-mini</div>
              <div className="text-sm">
                $0.23 / 1M input tokens
                <br />
                $0.90 / 1M output tokens
              </div>
              <div className="text-sm">
                $0.10 / 1M input tokens
                <br />
                $0.45 / 1M output tokens
              </div>
              <div>GPT-4o</div>
              <div className="text-sm">
                $5.00 / 1M input tokens
                <br />
                $15.00 / 1M output tokens
              </div>
              <div className="text-sm">
                $2.50 / 1M input tokens
                <br />
                $7.50 / 1M output tokens
              </div>
            </div>
            <div className="mt-4 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Anthropic
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>Claude 3.5 Sonnet</div>
              <div className="text-sm">
                $5.00 / 1M input tokens
                <br />
                $15.00 / 1M output tokens
              </div>
              <div className="text-sm">
                $2.50 / 1M input tokens
                <br />
                $7.50 / 1M output tokens
              </div>
              <div>Claude 3.5 Opus</div>
              <div className="text-sm">
                $5.00 / 1M input tokens
                <br />
                $15.00 / 1M output tokens
              </div>
              <div className="text-sm">
                $2.50 / 1M input tokens
                <br />
                $7.50 / 1M output tokens
              </div>
            </div>
            <div className="mt-4 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Groq
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>Llama 3.1 70b</div>
              <div className="text-sm">
                $5.00 / 1M input tokens
                <br />
                $15.00 / 1M output tokens
              </div>
              <div className="text-sm">
                $2.50 / 1M input tokens
                <br />
                $7.50 / 1M output tokens
              </div>
            </div>
          </div>
          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Price per 1 Million tokens starting at:
                </p>
                <p className="mt-6 flex flex-col items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $0.90
                  </span>
                  <span className="mt-3 text-xs leading-5 text-gray-600">
                    (Could be cheaper than $20 per month.)
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up and get $1 for free now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
