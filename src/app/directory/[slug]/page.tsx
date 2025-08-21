"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Stores } from "../../types/stores";
import useStore from "@/app/hooks/useStore";
import { use } from "react";

interface StorePageProps {
  params: Promise<{ slug: string }>; // Changed: params is now a Promise
}

export default function StorePage({ params }: StorePageProps) {
  // Changed: unwrap the params Promise using React's use() hook
  const { slug } = use(params);

  // Use the custom hook - all logic is now abstracted
  const { store, loading, error, selectedImage, setSelectedImage, refetch } =
    useStore({ slug });

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-center min-h-[400px] mt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading store...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-center min-h-[400px] mt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Store not found
  if (!store) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-center min-h-[400px] mt-20">
        <div className="text-gray-600">Store not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 mt-20">
      {/* Left side: Image preview + gallery */}
      <div>
        {/* Main Image */}
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={store.title || "Store image"}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-[400px]"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        {/* Thumbnails */}
        {store.gallery && store.gallery.length > 0 && (
          <div className="flex gap-4 mt-4">
            {store.gallery.map((img: Stores["gallery"][number], i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`rounded-md overflow-hidden border-2 mt-6 ${
                  selectedImage === img.url
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${store.title} thumbnail ${i + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-20 h-20"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right side: Store Info */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{store.title}</h1>

        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Details</h2>
          {store.details ? (
            <PortableText value={store.details} />
          ) : (
            <p className="text-sm text-gray-500">No details available.</p>
          )}
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-600">Store #: {store.storeNumber}</p>
          <p className="text-sm text-gray-600">Phone: {store.phoneNumber}</p>
          <p className="text-sm text-gray-600">Hours: {store.openHours}</p>
        </div>
      </div>
    </div>
  );
}
