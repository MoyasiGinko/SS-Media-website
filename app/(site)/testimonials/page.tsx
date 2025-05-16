import TestimonialSection from "@/components/testimonials-page/TestimonialSection";
import ReviewsGrid from "@/components/testimonials-page/ReviewSection";

export default function Home() {
  return (
    <div className="bg-[#141313] text-white min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center ">
        <TestimonialSection />
        <ReviewsGrid />
      </main>
    </div>
  );
}
