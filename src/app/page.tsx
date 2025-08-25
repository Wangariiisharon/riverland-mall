"use client";
import NearbyCarousel from "../components/nearby_carousel";
import LandingPage from "./home/page";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import LocationSection from "./location/page";

export default function HomePage() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // <-- get current path

  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  useEffect(() => {
    // ✅ For all non-homepage routes, always show shadow
    if (pathname !== "/") {
      setShowHeaderShadow(true);
      return;
    }

    // ✅ Homepage: enable scroll detection
    const headerHeight = 80;

    const isSectionVisible = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return false;
      const rect = ref.current.getBoundingClientRect();
      return rect.top <= headerHeight && rect.bottom > headerHeight;
    };

    const handleScroll = () => {
      if (
        isSectionVisible(aboutRef) ||
        isSectionVisible(locationRef) ||
        isSectionVisible(contactRef)
      ) {
        setShowHeaderShadow(true);
      } else {
        setShowHeaderShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check immediately on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <div className="">
      <div className="fixed inset-0 z-[-1]"></div>
      <LandingPage />

      <main>
        <section
          id="about"
          ref={aboutRef}
          className="md:pt-[100px] md:px-[160px] pt-[60px] px-[40px] bg-[#E7E9EB]"
        >
          <div className="mx-auto grid md:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-[616px] rounded-2xl overflow-hidden">
              <Image
                src="/img.png"
                alt="About Riverland Mall"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="md:ml-[128px]">
              <div className="flex flex-row mb-4">
                <div className="border-l text-sm border-black"></div>
                <p className="text-sm tracking-wider text-[#00032E]/50 uppercase ml-2">
                  About Riverland
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#00032E] mb-4 leading-snug">
                Luxury with a Purpose
              </h2>

              <p className="text-[#00032E] mb-4 leading-relaxed">
                Riverland Mall is a modern lifestyle destination designed to
                bring together retail, dining, and entertainment under one roof.
                Built with sustainability and innovation in mind, the mall
                combines elegant architecture with eco-conscious design,
                creating a space that is both functional and inspiring.
              </p>
              <p className="text-[#00032E] mb-6 leading-relaxed">
                More than a shopping center, Riverland Mall is a vibrant
                community hub where businesses thrive, families gather, and
                memorable experiences are made.
              </p>

              <button
                className="bg-[#D6A829] text-[#00032E] font-semibold py-2 px-6 rounded-md transition-colors"
                onClick={() => router.push("/directory")}
              >
                Explore Now
              </button>
            </div>
          </div>
        </section>
        {/* Locatio section */}
        <section
          id="location"
          ref={locationRef}
          className="pt-[84px] px-[40px] bg-[#E7E9EB] flex flex-col md:px-[160px] sm:px-6"
        >
          <div className=" mx-auto grid md:grid-cols-2  w-full">
            {/* Text content - Added responsive padding/margin */}
            <div className="">
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                  Location
                </p>
              </div>

              <h2 className=" text-3xl font-bold text-[#00032E] mb-4 leading-snug">
                Destination Runda
              </h2>
              <p className="text-[#00032E] leading-relaxed">
                Riverland Mall is located in the highly connected neighborhood
                of Runda, making it easy to access from key residential and
                business areas. Its central position ensures steady visitor flow
                from families, professionals, and students who frequent the area
                for shopping, dining, and leisure. With convenient transport
                links and ample parking, Riverland Mall serves as a welcoming
                destination for the wider community.
              </p>

              <button
                className="bg-[#D6A829] text-[#00032E] font-semibold py-2 px-6 rounded-md transition-colors"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps?q=-1.2086,36.8333",
                    "_blank"
                  )
                }
              >
                Get Directions
              </button>
            </div>
            {/* Left Image */}
            <LocationSection />
          </div>

          {/* Nearby section */}
          <div className="pt-[84px] md:pt-[96px] w-full  pb-[80px]">
            <h1 className="text-2xl text-pretty font-medium text-[#00032E] mb-4 text-center">
              The Riverland Experience
            </h1>
            <NearbyCarousel />
          </div>
        </section>
        <section
          id="contact"
          ref={contactRef}
          className="flex items-center justify-center"
        ></section>
      </main>
    </div>
  );
}
