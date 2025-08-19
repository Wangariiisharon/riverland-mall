"use client";
import ScheduleCallCard from "../components/scheduleACallForm";
import { Mouse } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="h-screen w-full bg-[url(/hero-bg.jpg)] bg-cover bg-center flex flex-col justify-end relative">
      {/* Content wrapper */}
      <footer className="flex flex-col items-center text-center space-y-6 pb-12">
        {/* Heading */}
        <p className="tracking-wide text-2xl text-[#E7E9EB]">
          Looking to Rent a Space? Get in Touch!
        </p>

        {/* Centered card */}
        <div className="flex justify-center w-full">
          <ScheduleCallCard />
        </div>

        {/* Mouse icon */}
        <div className="text-[#D6A829] mt-4">
          <Mouse />
        </div>
      </footer>
    </div>
  );
}
