"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNearbyPlaces } from "../../lib/nearbyPlaces/route";
import { NearbyPlace } from "../types/nearby_places";

export default function NearbyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locations, setLocations] = useState<NearbyPlace[]>([]);
  const [itemsPerView, setItemsPerView] = useState(4); // Default to 4 items visible

  // Fetch from Sanity
  useEffect(() => {
    async function fetchData() {
      const data = await getNearbyPlaces();
      setLocations(data);
    }
    fetchData();
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(5); // Show 5 items on desktop to match the image
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, locations.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, locations.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  if (!locations.length) {
    return <p className="text-center py-10">Loading nearby places...</p>;
  }

  return (
    <div className="mt-20 relative">
      <div className="w-full max-w-6xl mx-auto px-8">
        {/* Main Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {locations.map((location) => (
              <div
                key={location._id}
                className="flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="hover:shadow-lg transition-shadow duration-300 p-4">
                  {/* Image Container with consistent aspect ratio */}
                  <div className="w-full h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    {location.logoUrl ? (
                      <Image
                        src={location.logoUrl}
                        alt={location.title}
                        width={200}
                        height={240}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Location Title */}
                  <h3 className="text-sm font-medium text-gray-900 text-center line-clamp-2">
                    {location.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center mt-6 mb-4 space-x-4">
          <button
            onClick={prevSlide}
            className="bg-[#E7E9EB] border border-[#00032E7A] p-3 rounded-md shadow-lg 
              transition-all duration-200 hover:bg-gray-300 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-[#E7E9EB] border border-[#00032E7A] p-3 rounded-md shadow-lg 
              transition-all duration-200 hover:bg-gray-300 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
