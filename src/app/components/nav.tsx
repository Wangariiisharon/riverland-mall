"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Navbar({ hasShadow }: { hasShadow: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    }
  }, [pathname, searchParams]);
  const getLink = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };
  return (
    <div>
      <nav
        className={`fixed w-full z-20 top-0 start-0 transition-colors transition-shadow duration-300 ${
          hasShadow ? "shadow-md bg-[#E7E9EB]" : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Left Menu */}
          <div
            className={`hidden md:flex transition-colors duration-300 ${
              hasShadow ? "text-[#00032E]" : "text-white"
            }`}
          >
            <ul className="flex flex-row items-center space-x-8 font-medium">
              <li>
                <a
                  href={getLink("#about")}
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:bg-opacity-50"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={getLink("#location")}
                  className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:bg-opacity-50  md:p-0  md:dark:hover:bg-transparent"
                >
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0 transition-all duration-300">
            {hasShadow ? (
              <Image src="/darkLogo.svg" width={174} height={36} alt="Logo" />
            ) : (
              <Image src="/logo.svg" width={174} height={36} alt="Logo" />
            )}
          </div>

          {/* Right Menu */}
          <div
            className={`hidden md:flex transition-colors duration-300 ${
              hasShadow ? "text-black" : "text-white"
            }`}
          >
            {" "}
            <ul className="flex flex-row items-center space-x-8 font-medium">
              <li>
                <Link
                  href="/directory"
                  className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:bg-opacity-50 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Directory
                </Link>
              </li>
              <li>
                <a
                  href={getLink("#contact")}
                  className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:bg-opacity-50 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
