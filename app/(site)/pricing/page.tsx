import PriceHero from "@/components/pricing-page/hero/PriceHero";
import PlansSection from "@/components/pricing-page/plans/PlansSection";
import PackagesAndServices from "@/components/pricing-page/price-services/ServicePricing";

export default function Home() {
  return (
    <div className="bg-[#141313] text-white min-h-screen flex flex-col">
      <main className="pt-30 md:pt-40 flex flex-col items-center ">
        <PriceHero />
        <PlansSection />
        <PackagesAndServices />
      </main>
    </div>
  );
}
