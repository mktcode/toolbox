import { api } from "~/trpc/server";
import Philosophy from "./_components/landingpage/philosophy";
import Features from "./_components/landingpage/features";
import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";
import Feedback from "./_components/feedback";
import { getServerAuthSession } from "~/server/auth";
import Footer from "./_components/landingpage/footer";
import Blog from "./_components/landingpage/blog";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const latestSummary = await api.feedback.latestSummary();
  const newFeedback = await api.feedback.newPublicFeedback();

  return (
    <div>
      <Hero session={session} />
      <Philosophy />
      <Feedback latestSummary={latestSummary} newFeedback={newFeedback} />
      <Pricing />
      <Features />
      <Blog />
      <Footer />
    </div>
  );
}
