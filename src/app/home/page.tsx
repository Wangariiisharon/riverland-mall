"use client";
import ScheduleCallCard from "../../components/scheduleACallForm";
import { Mouse } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full bg-[url(/hero-bg.jpg)] bg-cover bg-center flex flex-col justify-end overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/heroVideo.mp4" type="video/mp4" />
        {/* Fallback if video isn't supported */}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for readability (optional) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Foreground Content */}
      <footer className="relative z-10 flex flex-col items-center text-center space-y-6 pb-12">
        <p className="tracking-wide text-2xl text-[#E7E9EB]">
          Looking to Rent a Space? Get in Touch!
        </p>

        <div className="flex justify-center w-full">
          <ScheduleCallCard />
        </div>

        <div className="text-[#D6A829] mt-4">
          <Mouse />
        </div>
      </footer>
    </div>
  );
}
