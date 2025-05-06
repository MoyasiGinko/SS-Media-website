import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Portfolio from "./components/Portfolio";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

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
