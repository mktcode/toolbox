import Link from "next/link";
import Philosophy from "./_components/landingpage/philosophy";
import Features from "./_components/landingpage/features";
import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Philosophy />
      <Pricing />
      <Features />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mt-24 text-center font-light text-gray-400">
            <p>
              <span className="inline-block rotate-180">
                <sub>&copy;</sub>
              </span>{" "}
              2024 Markus Kottländer.
              <br />
              All rights reversed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
