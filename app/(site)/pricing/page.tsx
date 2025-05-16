import PackagesAndServices from "@/components/pricing-page/Pricing";

export default function Home() {
  return (
    <div className="bg-[#141313] text-white min-h-screen flex flex-col">
      <main className="flex-1  flex flex-col items-center ">
        <PackagesAndServices />
      </main>
    </div>
  );
}
