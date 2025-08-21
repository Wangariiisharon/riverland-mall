"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

interface Business {
  id: string;
  name: string;
  code: string;
  logo?: string;
}

const sampleData: Business[] = [
  { id: "1", name: "Lorem ipsum dolor sit amet", code: "#1-390" },
  { id: "2", name: "Lorem ipsum dolor sit amet", code: "#B1-010" },
  { id: "3", name: "Lorem ipsum dolor sit amet", code: "#03-045" },
  { id: "4", name: "Lorem ipsum dolor sit amet", code: "#G-012" },
  { id: "5", name: "Lorem ipsum dolor sit amet", code: "#G-012" },
  { id: "6", name: "Lorem ipsum dolor sit amet", code: "#G-012" },
  { id: "7", name: "Lorem ipsum dolor sit amet", code: "#G-012" },
  { id: "8", name: "Lorem ipsum dolor sit amet", code: "#G-012" },
];

export default function SearchDirectory() {
  const [search, setSearch] = useState("");

  const filtered = sampleData.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="p-2 flex flex-row">
        <div className="flex gap-0 bg-[#172D44]/5 rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="relative flex-1 text-[#00032E]/50 py-1.5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#172D44]/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Company Name / Business Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent"
            />
          </div>
          {/* Category Divider */}
          <div className="flex items-center">
            <div className="h-5 w-px bg-[#00032E]/20 mx-2"></div>
          </div>
          {/* Category Input */}
          <div className="flex-1 text-[#172D44]/50 py-1.5">
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent"
            />
          </div>
          {/* Category Divider */}
          <div className="flex items-center">
            <div className="h-5 w-px bg-[#00032E]/20 mx-2"></div>
          </div>

          {/* Sort By Input */}
          <div className="flex-1 text-[#172D44]/50 py-1.5">
            <input
              type="text"
              placeholder="Sort By"
              className="w-full px-4 py-2.5 focus:outline-none focus:ring-0 text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button className="flex items-center ml-6 gap-2 px-4 bg-[#D6A829] text-[#00032E] font-medium rounded-lg text-sm whitespace-nowrap">
          <span>Filter by</span>
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Business List */}
      {/* Business List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        {filtered.map((biz) => (
          <div
            key={biz.id}
            className="flex items-center gap-6 border-2 border-[#00032E]/5 rounded-lg p-6 w-full"
          >
            {/* Logo Placeholder */}
            <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-300 rounded" />
            </div>

            {/* Business Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {biz.name}
              </h3>
              <p className="text-xs text-gray-500">{biz.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
