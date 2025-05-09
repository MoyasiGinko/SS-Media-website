import React from "react";

interface QRCodeCardProps {
  label: string;
}

export default function QRCodeCard({ label }: QRCodeCardProps) {
  return (
    <div className="flex flex-col items-center border-4 border-black rounded-xl p-4 shadow-lg min-w-[150px]">
      <span className="font-bold text-lg mb-2">{label}</span>
      <div className="w-24 h-24 bg-gray-100 rounded-lg" />
    </div>
  );
}
