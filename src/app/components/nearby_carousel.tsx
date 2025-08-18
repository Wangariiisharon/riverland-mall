"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNearbyPlaces } from "../api/contact/nearbyPlaces";
import { NearbyPlace } from "../types/nearby_places";

export default function NearbyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locations, setLocations] = useState<NearbyPlace[]>([]);

  // Fetch from Sanity
  useEffect(() => {
    async function fetchData() {
      const data = await getNearbyPlaces();
      setLocations(data);
    }
    fetchData();
  }, []);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!locations.length) {
    return <p className="text-center py-10">Loading nearby places...</p>;
  }

  return (
    <div className="mt-20 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-center space-x-8">
          {locations.map((location, index) => {
            const isActive = index === currentIndex;
            const isAdjacent =
              Math.abs(index - currentIndex) === 1 ||
              (currentIndex === 0 && index === locations.length - 1) ||
              (currentIndex === locations.length - 1 && index === 0);

            if (!isActive && !isAdjacent) return null;

            return (
              <div
                key={location._id}
                onClick={() => goToSlide(index)}
                className={`
                  cursor-pointer transition-all duration-500 ease-in-out
                  ${
                    isActive
                      ? "transform scale-110 opacity-100"
                      : "transform scale-90 opacity-60 hover:opacity-80"
                  }
                `}
              >
                <div
                  className={`
                     rounded-md shadow-md p-6 text-center
                    ${isActive ? "shadow-2xl" : "shadow-md"}
                    min-w-[200px] max-w-[240px]
                  `}
                >
                  {/* Logo Image */}
                  {location.logoUrl ? (
                    <Image
                      src={location.logoUrl}
                      alt={location.title}
                      className="w-[200px] h-[240px] object-contain mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200" />
                  )}

                  {/* Location Title */}
                </div>
                <h3
                  className={`mt-2 transition-all duration-300 text-center
                      ${isActive ? "text-base text-gray-900" : "text-sm text-gray-700"}`}
                >
                  {location.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-20">
        <button
          onClick={prevSlide}
          className="transform -translate-y-1/2 bg-[#E7E9EB] border border-[#00032E7A] p-3 rounded-md shadow-lg hover:bg-opacity-100 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="ml-[36px] transform -translate-y-1/2 bg-[#E7E9EB] border border-[#00032E7A] p-3 rounded-md shadow-lg hover:bg-opacity-100 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Nav Buttons */}
    </div>
  );
}
