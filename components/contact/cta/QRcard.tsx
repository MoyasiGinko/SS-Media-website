import React from "react";

interface QRCodeCardProps {
  label: string;
  src: string;
}

export default function QRCodeCard({ label, src }: QRCodeCardProps) {
  return (
    <div className="flex flex-col bg-[#202129] items-center border-1 border-[#FC5F67] rounded-xl p-5 shadow-lg min-w-[150px]">
      <span className="font-bold text-3xl mb-4">{label}</span>
      <img
        src={src}
        alt={`${label} QR Code`}
        className="w-[220px] h-[220px] rounded-lg object-fit cover"
        loading="lazy"
      />
    </div>
  );
}
