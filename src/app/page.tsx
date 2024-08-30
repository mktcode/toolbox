import Philosophy from "./_components/landingpage/philosophy";
import Features from "./_components/landingpage/features";
import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";
import { getServerAuthSession } from "~/server/auth";
import Footer from "./_components/landingpage/footer";
import Blog from "./_components/landingpage/blog";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <div>
      <Hero session={session} />
      <Philosophy />
      <Pricing />
      <Features />
      <Blog />
      <Footer />
    </div>
  );
}
