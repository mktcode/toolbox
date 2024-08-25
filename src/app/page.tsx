import { api } from "~/trpc/server";
import Philosophy from "./_components/landingpage/philosophy";
import Features from "./_components/landingpage/features";
import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";
import Feedback from "./_components/feedback";

export default async function HomePage() {
  const latestSummary = await api.feedback.latestSummary();
  const newFeedback = await api.feedback.newPublicFeedback();

  return (
    <div>
      <Hero />
      <Philosophy />
      <Feedback latestSummary={latestSummary} newFeedback={newFeedback} />
      <Pricing />
      <Features />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mt-24 text-center font-light text-gray-400">
          <p>
            <span className="inline-block rotate-180">&copy;</span> 2024 Markus
            Kottländer.
            <br />
            All rights reversed.
          </p>
        </div>
      </div>
    </div>
  );
}
