import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const features = [
  {
    name: "Next.js",
    description:
      "React. Oh no. I've been a hater, now I'm an understander. And Next.js... Thank you for server components. It was the right thing to do.",
    icon: CloudArrowUpIcon,
    button: (
      <Link href="https://nextjs.org" target="_blank">
        <button className="button shy">Learn more</button>
      </Link>
    ),
  },
  {
    name: "Stripe",
    description:
      "There would probably be no business here without Stripe. Let's be honest.",
    icon: LockClosedIcon,
    button: (
      <Link href="https://stripe.com" target="_blank">
        <button className="button shy">Learn more</button>
      </Link>
    ),
  },
  {
    name: "GitHub",
    description:
      "GitHub pulled me so much deeper into software development years ago. It's automating my deployments now.",
    icon: ArrowPathIcon,
    button: (
      <Link href="https://github.com" target="_blank">
        <button className="button shy">Learn more</button>
      </Link>
    ),
  },
  {
    name: "Uberspace",
    description:
      "The nicest hoster I've ever had. By admins for admins. It's more for smaller projects but that's what this still is.",
    icon: FingerPrintIcon,
    button: (
      <Link href="https://uberspace.de" target="_blank">
        <button className="button shy">Learn more</button>
      </Link>
    ),
  },
];

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
              Yes, I want to make money. But I couldn't look myself in the
              mirror if I kept the source code closed. It's nothing special,
              just a couple of popular building blocks and the big players
              providing the AI in the background.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              So when it comes to the AI, it's not very open source. I can add
              Ollama-support. But not now. I mean, you can probably just swap
              the URL to an Ollama instance and it should work.
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
                  Source code
                </button>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                    <div className="mt-4">{feature.button}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
