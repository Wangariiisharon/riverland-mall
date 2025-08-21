"use client";
import { useRef, useEffect, useState } from "react";
import SearchDirectory from "../components/searchDirectory";
import Amenities from "../components/amenities";

import { Mouse } from "lucide-react";
export default function StoreDirectoryPage() {
  const searchDirectoryRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  useEffect(() => {
    const headerHeight = 80;

    const isSectionVisible = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return false;
      const rect = ref.current.getBoundingClientRect();
      return rect.top <= headerHeight && rect.bottom > headerHeight;
    };

    const handleScroll = () => {
      if (
        isSectionVisible(searchDirectoryRef) ||
        isSectionVisible(contactRef)
      ) {
        setShowHeaderShadow(true);
      } else {
        setShowHeaderShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <main>
        <section
          id="landing"
          className="h-screen w-full bg-[url(/bg.jpg)] bg-cover bg-center flex flex-col items-center  text-center justify-end relative"
        >
          <div className="flex flex-col items-center text-center space-y-6 pb-12">
            <p className="tracking-wide text-2xl text-[#E7E9EB]">
              STORE DIRECTORY
            </p>
            <div className="text-[#D6A829] mt-4">
              <Mouse />
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section
          id="directory"
          ref={searchDirectoryRef}
          // className="h-screen w-full pt-12 bg-[#E7E9EB] flex flex-col  px-4 sm:px-6 "
          className="h-screen w-full bg-[#E7E9EB]"
        >
          <div className="max-w-screen-xl flex flex flex-col justify-cente mx-auto pt-14 px-4">
            <SearchDirectory />
            <Amenities />
          </div>
        </section>
      </main>
    </div>
  );
}
