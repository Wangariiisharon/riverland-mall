"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNearbyPlaces } from "../lib/nearbyPlaces/route";
import { NearbyPlace } from "../types/nearby_places";

export default function NearbyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locations, setLocations] = useState<NearbyPlace[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getNearbyPlaces();
      setLocations(data);
      setCurrentIndex(data.length); // start in middle
    }
    fetchData();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 768) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(6);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  // Autoplay
  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 3000);
    return () => clearInterval(timeoutRef.current as NodeJS.Timeout);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (!locations.length) return;
    if (currentIndex === locations.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(locations.length);
      }, 500);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(locations.length);
      }, 500);
    }
  }, [currentIndex, locations]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => setIsTransitioning(true));
    }
  }, [isTransitioning]);

  if (!locations.length) return null;

  const clonedSlides = [...locations, ...locations, ...locations];

  return (
    <div className="relative mt-20 w-full mx-auto">
      <div className="overflow-hidden relative">
        <div
          className={`flex gap-6 ${
            isTransitioning
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {clonedSlides.map((location, idx) => {
            let middleIndex: number;
            if (itemsPerView % 2 === 0) {
              middleIndex = currentIndex + Math.floor(itemsPerView / 2) - 1;
            } else {
              middleIndex = currentIndex + Math.floor(itemsPerView / 2);
            }
            const isActive = idx === middleIndex;

            return (
              <div
                key={location._id + idx}
                className="flex-shrink-0 flex justify-center flex-col items-center"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div
                  className={`p-4 text-center transition-all duration-500 ${
                    isActive
                      ? "scale-110 opacity-100 blur-0"
                      : "scale-100 opacity-80 blur-sm"
                  }`}
                >
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    {location.logoUrl ? (
                      <Image
                        src={location.logoUrl}
                        alt={location.title}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3
                  className={`text-sm font-medium transition-colors text-center ${
                    isActive ? "text-black" : "text-black"
                  }`}
                >
                  {location.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows */}
      <div className="flex justify-center items-center pt-8 space-x-4">
        <button
          onClick={prevSlide}
          className="bg-gray-200 p-3 rounded-md hover:bg-[#D6A829]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-200 p-3 rounded-md hover:bg-[#D6A829]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
