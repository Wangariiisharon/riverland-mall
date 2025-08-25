"use client";
import { useRef, useEffect, useState } from "react";
import SearchDirectory from "../../components/searchDirectory";
import Amenities from "../../components/amenities";

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
        {/* <section
          id="landing"
          className="h-screen w-full bg-[url(/store_directory_bg.jpg)] bg-cover bg-center flex flex-col items-center  text-center justify-end relative"
        >
          <div className="flex flex-col items-center text-center space-y-6 pb-12">
            <p className="tracking-wider text-4xl text-[#E7E9EB]">
              STORE DIRECTORY
            </p>
            <div className="text-[#D6A829] mt-4">
              <Mouse />
            </div>
          </div>
        </section> */}
        <section
          id="landing"
          className="h-screen w-full relative flex flex-col items-center text-center justify-end"
        >
          {/* Background with overlay */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-[url(/store_directory_bg.jpg)] bg-cover bg-center" />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 pb-12">
            <p className="tracking-wider text-4xl text-[#E7E9EB]">
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
          className="w-full bg-[#E7E9EB]"
        >
          <div className="flex flex flex-col md:px-[160px] px-[40px] md:pt-[86px] pt-[60px] mx-auto">
            <SearchDirectory />
            <Amenities />
          </div>
        </section>
      </main>
    </div>
  );
}
