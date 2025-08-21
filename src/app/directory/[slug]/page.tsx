"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Stores } from "../../../types/stores";
import useStore from "@/hooks/useStore";
import { use, useEffect } from "react";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";

interface StorePageProps {
  params: Promise<{ slug: string }>; // Changed: params is now a Promise
}

export default function StorePage({ params }: StorePageProps) {
  // Changed: unwrap the params Promise using React's use() hook
  const { slug } = use(params);

  // Use the custom hook - all logic is now abstracted
  const { store, loading, error, selectedImage, setSelectedImage, refetch } =
    useStore({ slug });
  useEffect(() => {}, [slug]);

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

  // Store not found
  if (!store) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-center min-h-[400px] mt-20">
        <div className="text-gray-600">Store not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-20 bg-[#E7E9EB]">
      <div className=" px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
          <div className="flex flex-col">
            <Link href="/directory">
              <div className="border-1 border-[#00032E]/50 rounded-full h-10 w-10">
                <CornerUpLeft className="h-8 w-8 text-[#00032E]/50" />
              </div>
            </Link>

            {/* Left side: Image preview + gallery */}
            <div>
              <div className="w-full h-[300px] md:w-[600px] md:h-[600px] rounded-[20px] overflow-hidden mt-6">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={store.title || "Store image"}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>
              {/* Main Image */}

              {/* Thumbnails */}
              {store.gallery && store.gallery.length > 0 && (
                <div className="flex gap-4 mt-4">
                  {store.gallery.map(
                    (img: Stores["gallery"][number], i: number) => (
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
                          alt="Store image"
                          width={80}
                          height={80}
                          className="object-cover w-20 h-20"
                        />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* <div className="md:ml-10">
              <div className="flex flex-row mb-4">
                <div className="border-l-1 text-sm border-black"></div>
                <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                  About Riverland
                </p>
              </div> */}
          {/* Right side: Store Info */}
          <div className="md:ml-10">
            <div className="flex flex-row mb-4">
              <div className="border-l-1 text-sm border-black"></div>
              <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                Fine dining
              </p>
            </div>
            {/* <h1 className="text-2xl font-bold text-gray-900">{store.title}</h1> */}
            <h2 className="text-3xl font-bold text-[#00032E] mb-4 leading-snug">
              {store.title}{" "}
            </h2>
            <div className="text-[#00032E] mb-4 leading-relaxed">
              {store.details ? (
                <PortableText value={store.details} />
              ) : (
                <p className="text-sm text-gray-500">No details available.</p>
              )}
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-600">
                Store #: {store.storeNumber}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {store.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">Hours: {store.openHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
