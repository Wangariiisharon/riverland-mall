"use client";
import { useState } from "react";
import Image from "next/image";

export default function LocationSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:ml-[128px] relative w-full h-64  sm:h-80 md:h-[459px] rounded-2xl overflow-hidden">
      {/* Thumbnail image */}
      <Image
        src="/location.png"
        alt="Riverland Mall Location"
        width={600}
        height={600}
        className="object-cover"
        onClick={() => setIsOpen(true)}
      />

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-5xl w-full mx-4">
            <Image
              src="/location.png"
              alt="Riverland Mall Location"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
