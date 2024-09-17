import Pricing from "./_components/landingpage/pricing";
import Hero from "./_components/landingpage/hero";
import { getServerAuthSession } from "~/server/auth";
import Footer from "./_components/landingpage/footer";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <div>
      <Hero session={session} />
      <Pricing />
      <Footer />
    </div>
  );
}
