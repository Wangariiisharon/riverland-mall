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
];

export default function SearchDirectory() {
  const [search, setSearch] = useState("");

  const filtered = sampleData.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <div className="bg-[#172D44]/6 p-2">
        <div className="flex items-center gap-0">
          {/* Search Input */}
          <div className="relative flex-1 ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Company Name / Business Name"
              className="w-full pl-10 pr-4 py-2.5  rounded-l-lg focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Category Input */}
          <div className="flex-1 border-l-1 border-gray-400 ">
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2.5  focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          {/* Sort By Input */}
          <div className="flex-1 border-l-1 border-gray-400">
            <input
              type="text"
              placeholder="Sort By"
              className="w-full px-4 py-2.5  focus:outline-none focus:ring-0  text-sm"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-r-lg border border-yellow-400 text-sm whitespace-nowrap">
            <span>Filter by</span>
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Business List */}
      <div className="space-y-3 pt-12">
        {filtered.map((biz) => (
          <div
            key={biz.id}
            className="flex items-center gap-4 bg-gray-100 border border-gray-200 rounded-lg p-4"
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
