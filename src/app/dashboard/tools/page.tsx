import { Button } from "@headlessui/react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Toolbox / Dashboard",
};

export default async function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main className="mx-auto my-6 w-full max-w-7xl grow flex-col px-4 lg:my-16 lg:px-12">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Native Speaker</h2>
              <p className="mb-6 text-gray-500">
                Translate and refine your texts and messages with the help of a
                native speaker. Get suggestions for better wording and grammar
                and learn the language on the go.
              </p>
              <Link href="/tools/nativeSpeaker">
                <Button className="button w-full">Use</Button>
              </Link>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Don't Forget</h2>
              <p className="mb-6 text-gray-500">
                A simple tool to help you remember important details in your
                planning. Just share a topic and some text, and it will guide
                you through refining your ideas and ensuring nothing gets
                missed.
              </p>
              <Link href="/tools/dontForget">
                <Button className="button w-full">Use</Button>
              </Link>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Voice Generator</h2>
              <p className="mb-6 text-gray-500">
                Generate professional voice recordings from your text.
              </p>
              <Link href="/tools/voice">
                <Button className="button w-full">Use</Button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Search</h2>
              <p className="mb-6 text-gray-500">
                Let AI search the web for you. Get the most relevant results and
                summarized information, including images and videos.
              </p>
              <div className="flex space-x-4">
                <Button disabled className="button w-full">
                  Coming soon
                </Button>
                <Link href="https://markus-kottlaender.de" target="_blank">
                  <Button className="button w-full">Meanwhile...</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Digitizer</h2>
              <p className="mb-6 text-gray-500">
                Upload documents and images and extract structured data, to
                import them into your favorite tools.
              </p>
              <Button disabled className="button w-full">
                Coming soon
              </Button>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Feature Shaping</h2>
              <p className="mb-6 text-gray-500">
                Helps to shape your product features before implementing them.
                Evaluate your ideas and clarify what can be clarified, in order
                to reduce communication friction and increase the chances of
                creating an actually useful feature.
              </p>
              <Button disabled className="button w-full">
                Coming soon
              </Button>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <h2>Image Generator</h2>
              <p className="mb-6 text-gray-500">
                Generate images for your social media posts, blog articles or
                landingpages.
              </p>
              <Button disabled className="button w-full">
                Coming soon
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
