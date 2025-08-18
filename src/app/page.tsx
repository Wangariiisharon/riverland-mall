"use client";
import { Navbar } from "./components/nav";
import NearbyCarousel from "./components/nearby_carousel";
import LandingPage from "./home/page";
import { useRef, useEffect, useState, Suspense } from "react";

import Footer from "./footer";

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
      <div className="fixed inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center z-[-1]"></div>
      {/* Navbar with shadow based on scroll position */}
      <Suspense fallback={<div />}>
        <Navbar hasShadow={showHeaderShadow} />
      </Suspense>
      <LandingPage />
      <main>
        <section
          id="about"
          ref={aboutRef}
          className="pt-30 bg-[#E7E9EB] flex items-center justify-center"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Image */}
            <div className="w-full max-w-[640px] aspect-[640/616] rounded-[20px] bg-gray-500">
              {/* <Image
                src="/your-image.jpg"
                alt="About Riverland"
                fill
                className="object-cover"
                priority
              /> */}
            </div>

            {/* Right: Text content */}
            <div>
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-gray-500 uppercase ml-2">
                  About Riverland
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Luxury with Purpose, Community at Heart{" "}
              </h2>
              <p className="text-gray-700 mb-4">
                Riverland Mall is a modern lifestyle destination designed to
                bring together retail, dining, and entertainment under one roof.
                Built with sustainability and innovation in mind, the mall
                combines elegant architecture with eco-conscious design,
                creating a space that is both functional and inspiring.
              </p>
              <p className="text-gray-700 mb-6">
                More than a shopping center, Riverland Mall is a vibrant
                community hub where businesses thrive, families gather, and
                memorable experiences are made.
              </p>
              <button className="bg-[#D6A829] hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                Explore Now
              </button>
            </div>
          </div>
        </section>
        <section
          id="location"
          ref={locationRef}
          className="pt-30 bg-[#E7E9EB] flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* left: Text content */}
            <div className="flex flex-col justify-center md:items-start items-center text-left max-w-xl p-6">
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-gray-500 uppercase ml-2">
                  Location
                </p>
              </div>
              <h2 className="text-3xl text-pretty font-bold text-gray-900 mb-4">
                Seamlessly Connected, Perfectly Positioned{" "}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Riverland Mall is located in the highly connected neighborhood
                of Runda, making it easy to access from key residential and
                business areas.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Its central position ensures steady visitor flow from families,
                professionals, and students who frequent the area for shopping,
                dining, and leisure. With convenient transport links and ample
                parking, Riverland Mall serves as a welcoming destination for
                the wider community.
              </p>
              <button className="bg-[#D6A829] hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                Explore Now
              </button>
            </div>
            {/* right: Image */}

            <div className="w-full max-w-[640px] aspect-[640/616] rounded-[20px] bg-gray-500">
              {/* <Image
                src="/your-image.jpg"
                alt="About Riverland"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
          </div>
          <div className="mt-30">
            <h1 className="text-2xl text-pretty font-medium text-gray-900 mb-4 text-center">
              Shop the Riverland Experience
            </h1>
            <NearbyCarousel />
          </div>
        </section>
        <section
          id="contact"
          ref={contactRef}
          className="flex items-center justify-center"
        >
          <Footer />
        </section>
      </main>
    </div>
  );
}
