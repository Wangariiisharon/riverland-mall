"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Stores } from "../types/stores";
import { getStores } from "@/lib/getStores/route";
import Image from "next/image";
import Link from "next/link";

export default function SearchDirectory() {
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<Stores[]>([]);
  const [category, setCategory] = useState(""); // selected category
  const [categories, setCategories] = useState<string[]>([]); // list of categories
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc, newest, oldest

  const CATEGORY_OPTIONS = [
    { title: "Fine Dining", value: "finedining" },
    { title: "Health & Wellness", value: "healthwellness" },
    { title: "Shopping", value: "shopping" },
    { title: "Entertainment", value: "entertainment" },
    { title: "Outdoor Space", value: "outdoor" },
    { title: "Petrol Station", value: "petrolstation" },
    { title: "Office Space", value: "officespace" },
    { title: "Gym", value: "gym" },
  ];

  // Fetch from Sanity
  useEffect(() => {
    async function fetchData() {
      const data = await getStores();
      setStores(data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((store: Stores) => store.category)),
      ].filter(Boolean); // remove null/undefined
      setCategories(uniqueCategories);

      console.log("Categories:", uniqueCategories);
      console.log("Fetched stores:", data);
    }
    fetchData();
  }, []);

  // Apply search + category filter
  const filtered = stores.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? b.category === category : true)
  );

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sortOrder) {
      case "asc":
        return a.title.localeCompare(b.title);
      case "desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return new Date(b.AddedAt).getTime() - new Date(a.AddedAt).getTime();
      case "oldest":
        return new Date(a.AddedAt).getTime() - new Date(b.AddedAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex flex-row w-full">
        <div className="flex gap-0 bg-[#172D44]/5 rounded-lg overflow-hidden relative w-full">
          {/* Search Input */}
          <div className="relative flex-1 text-[#00032E]/50 py-1.5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#172D44]/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Company Name / Business Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-4 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="h-5 w-px bg-[#00032E]/20 mx-2"></div>
          </div>

          {/* Category Dropdown */}
          {/* Category Dropdown */}
          <div className="relative flex-1 text-[#172D44]/50 py-1.5 px-5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-10 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent appearance-none"
            >
              <option value="">All Categories</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#172D44]/50 w-4 h-4 pointer-events-none" />
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="h-5 w-px bg-[#00032E]/20 mx-2"></div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex-1 text-[#172D44]/50 py-1.5 px-5">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-10 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent appearance-none"
            >
              <option value="asc">Sort: A → Z</option>
              <option value="desc">Sort: Z → A</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#172D44]/50 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        {sorted.map((biz, index) => (
          <Link key={index} href={`/directory/${biz.slug}`}>
            <div className="flex items-center gap-6 border-2 border-[#00032E]/5 rounded-lg p-6 w-full hover:shadow-md transition cursor-pointer">
              {biz.logo ? (
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                  <Image
                    src={biz.logo}
                    alt={biz.title}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                  <div className="w-10 h-10 bg-gray-300 rounded" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {biz.title}
                </h3>
                <p className="text-xs text-gray-500">{biz.storeNumber}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
