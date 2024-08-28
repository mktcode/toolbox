import Link from "next/link";

export default function Features() {
  return (
    <>
      <a id="community" className="block h-0" />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              You don't need to pay me.
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              It's all free and open source.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Yes, I want to make money. But I couldn't look at myself in the
              mirror if I kept the source code closed. It's a bit messy
              currently but I'm a Senior™ developer. I have it under control.
              If you want your own private instance, I'll be happy to help you
              set it up. There will be a Docker image soon.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="https://github.com/mktcode/senior-react"
                target="_blank"
              >
                <button className="button !shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-6 w-6"
                    fill="currentColor"
                  >
                    <path
                      d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Source Code
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
