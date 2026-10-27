import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Venues from "@/components/Venues";
import AddOns from "@/components/AddOns";
import Steps from "@/components/Steps";
import Proof from "@/components/Proof";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { steps } from "@/config/site";

export default function Home() {
  return (
    <main>
      <Hero
        title="Surprise someone in Cabo."
        subtitle="Room decor, flowers, cakes and proposals — set up before you walk in."
        cta="Plan my surprise"
        message="Hi Cabo Surprise! I'd like to plan a surprise in Cabo. Occasion: ___ . Date: ___ ."
        label="hero"
        photo="hero.jpg"
      />
      <Packages />
      <Venues />
      <AddOns />
      <Steps items={steps} />
      <Proof />
      <FinalCta />
      <Footer />
    </main>
  );
}
