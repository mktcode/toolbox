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

      <main className="mx-auto flex w-full max-w-7xl grow flex-col space-y-3 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <h2>Native Speaker</h2>
          <p className="mb-6 text-gray-500">
            Refine your texts and messages with the help of a native speaker.
          </p>
          <Link href="/tools/nativeSpeaker">
            <Button className="button w-full">Use</Button>
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2>Search</h2>
          <p className="mb-6 text-gray-500">
            Let AI search the web for you. Get the most relevant results and
            summarized information, including images and videos.
          </p>
          <Link href="/tools/search">
            <Button className="button w-full">Use</Button>
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2>Image Generator</h2>
          <p className="mb-6 text-gray-500">
            Generate images for your social media posts, blog articles or
            landingpages.
          </p>
          <Button disabled className="button w-full">
            Coming soon
          </Button>
        </div>
      </main>
    </>
  );
}
