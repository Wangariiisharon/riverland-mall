"use client";
import NearbyCarousel from "./components/nearby_carousel";
import LandingPage from "./home/page";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
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
  }, []);

  return (
    <div>
      <div className="fixed inset-0 z-[-1]"></div>
      <LandingPage />
      <main>
        <section
          id="about"
          ref={aboutRef}
          className="pt-30 bg-[#E7E9EB] flex flex-col items-center justify-center px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
            <div className="w-full h-[300px] md:w-[600px] md:h-[600px] rounded-[20px] overflow-hidden">
              <Image
                src="/img.png"
                alt="About Riverland Mall"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:ml-10">
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                  About Riverland
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#00032E] mb-4 leading-snug">
                Luxury with Purpose, <br /> Community at Heart
              </h2>
              <p className="text-[#00032E] mb-4 leading-relaxed">
                Riverland Mall is a modern lifestyle destination <br />
                designed to bring together retail, dining, and <br />{" "}
                entertainment under one roof. Built with <br /> sustainability
                and innovation in mind, the mall <br /> combines elegant
                architecture with eco-conscious <br />
                design, creating a space that is both functional and <br />
                inspiring.
              </p>
              <p className="text-[#00032E] mb-6 leading-relaxed">
                More than a shopping center, Riverland Mall is a <br /> vibrant
                community hub where businesses thrive, <br /> families gather,
                and memorable experiences are <br /> made.
              </p>
              <button className="bg-[#D6A829] text-[#00032E] font-semibold py-2 px-6 rounded-md transition-colors">
                Explore Now
              </button>
            </div>

            {/* Image container - identical to location section */}
          </div>
        </section>
        <section
          id="location"
          ref={locationRef}
          className="pt-30 bg-[#E7E9EB] flex flex-col items-center justify-center px-4 sm:px-6"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
            {/* Text content - Added responsive padding/margin */}
            <div className="md:ml-10">
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                  Location
                </p>
              </div>

              <h2 className="text-3xl font-bold text-[#00032E] mb-4 leading-snug">
                Seamlessly Connected, Perfectly Positioned
              </h2>
              <p className="text-[#00032E] mb-4 leading-relaxed">
                Riverland Mall is located in the highly connected <br />
                neighborhood of Runda, making it easy to access <br /> from key
                residential and business areas.
              </p>
              <p className="text-[#00032E] mb-6 leading-relaxed">
                Its central position ensures steady visitor flow from <br />
                families, professionals, and students who frequent <br /> the
                area for shopping, dining, and leisure. With <br /> convenient
                transport links and ample parking,
                <br /> Riverland Mall serves as a welcoming destination for
                <br />
                the wider community.
              </p>
            </div>

            {/* Image container - Responsive sizing */}
            <div className="w-full h-[300px] md:w-[600px] md:h-[600px] rounded-[20px] bg-gray-500 overflow-hidden">
              {/* For actual image, use something like: */}
              {/* <Image
        src="/location-image.jpg"
        alt="Riverland Mall Location"
        width={600}
        height={600}
        className="w-full h-full object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      /> */}
            </div>
          </div>

          {/* Nearby section */}
          <div className="mt-30 w-full max-w-6xl">
            <h1 className="text-2xl text-pretty font-medium text-[#00032E] mb-4 text-center">
              Shop the Riverland Experience
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
