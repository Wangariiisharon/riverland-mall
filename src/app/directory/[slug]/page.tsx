"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Stores, CategoryMap } from "../../../types/stores";
import useStore from "@/hooks/useStore";
import { use, useEffect } from "react";
import Link from "next/link";

interface StorePageProps {
  params: Promise<{ slug: string }>; // params is a Promise
}

export default function StorePage({ params }: StorePageProps) {
  // Changed: unwrap the params Promise using React's use() hook
  const { slug } = use(params);

  const { store, loading, error, selectedImage, setSelectedImage, refetch } =
    useStore({ slug });
  useEffect(() => {}, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto  md:px-[160px] pt-[60px] px-[40px]">
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
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-center mt-20">
        <div className="text-gray-600">Store not found</div>
      </div>
    );
  }

  return (
    <div className=" bg-[#E7E9EB] md:px-[160px] px-[40px] pb-[60px]">
      <div className="">
        <div className="pt-[100px]">
          <Link href="/directory">
            <div className="cursor-pointer bg-[#E7E9EB] w-[32px] h-[32px] md:w-[40px] md:h-[40px]">
              <Image
                src="/arrow-back.svg"
                alt="Back to directory"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="mx-auto grid md:grid-cols-2 md:gap-[128px] gap-[60px] w-full pt-[52px]">
          <div className="flex flex-col">
            {/* Left side: Image preview + gallery */}
            <div>
              <div className="w-full h-[300px] md:w-[600px] md:h-[600px] rounded-[20px] overflow-hidden ">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={store.title || "Store image"}
                    width={480}
                    height={520}
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

          {/* Right side: Store Info */}
          <div className="">
            <div className="flex flex-row">
              <div className="border-l-1 text-sm border-black"></div>
              <p className="text-sm font-400 tracking-wider text-[#00032E]/50 uppercase ml-2">
                {CategoryMap[store.category]}
              </p>
            </div>
            {/* <h1 className="text-2xl font-bold text-gray-900">{store.title}</h1> */}
            <h2 className="text-3xl font-bold text-[#00032E] mb-4  pt-[36px] leading-snug">
              {store.title}
            </h2>
            <div className="text-[#00032E] mb-4 leading-relaxed">
              {store.details ? (
                <PortableText value={store.details} />
              ) : (
                <p className="text-sm text-gray-500">No details available.</p>
              )}
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Image
                  src="/storeNumber.svg"
                  alt="Store number"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>{store.storeNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Image
                  src="/storePhoneNo.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>{store.phoneNumber}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Image
                  src="/opening-hours.svg"
                  alt="Open hours"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>{store.openHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
