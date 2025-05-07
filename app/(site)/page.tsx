import Navbar from "@/components/main/header/Navbar";
import Hero from "@/components/main/hero/Hero";
import Stats from "@/components/main/stats/Stats";
import Services from "@/components/main/services/Services";
import Testimonials from "@/components/main/testimonials/Testimonials";
import Portfolio from "@/components/main/portfolio/Portfolio";
import FAQ from "@/components/main/faq/FAQ";
import Footer from "@/components/main/footer/Footer";

export default function Home() {
  return (
    <div className="bg-[#111] text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <Hero />
        <Stats />
        <Services />
        <Testimonials />
        <Portfolio />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
