"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar({ hasShadow }: { hasShadow: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

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
        className={`fixed w-full z-20 top-0 start-0 px-[40px] md:px-[160px] transition-colors transition-shadow duration-300 py-[28px] ${
          hasShadow ? "shadow-md bg-[#E7E9EB]" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between mx-auto">
          {/* Left Menu (Desktop only) */}
          <div
            className={`hidden md:flex transition-colors duration-300 ${
              hasShadow ? "text-[#00032E]" : "text-white"
            }`}
          >
            <ul className="flex flex-row items-center space-x-[48px] font-medium">
              <li>
                <a href={getLink("#about")}>About Us</a>
              </li>
              <li>
                <a href={getLink("#location")}>Location</a>
              </li>
            </ul>
          </div>

          {/* Center Logo */}
          <Link href="/">
            <div className="flex-shrink-0 transition-all md:px-[316px] duration-300">
              {hasShadow ? (
                <Image src="/darkLogo.svg" width={174} height={36} alt="Logo" />
              ) : (
                <Image src="/logo.svg" width={174} height={36} alt="Logo" />
              )}
            </div>
          </Link>

          {/* Right Menu (Desktop) */}
          <div
            className={`hidden md:flex transition-colors duration-300 ${
              hasShadow ? "text-black" : "text-white"
            }`}
          >
            <ul className="flex flex-row items-center space-x-[48px] font-medium">
              <li>
                <Link href="/directory">Directory</Link>
              </li>
              <li>
                <a href={getLink("#contact")}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Mobile Hamburger (ONLY on small screens) */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              hasShadow ? "text-black" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <ul
            className={`absolute right-4 mt-2 flex flex-col px-6 py-4 space-y-4 md:hidden ${hasShadow ? "text-[#00032E]" : "text-white"}`}
          >
            <li>
              <a href={getLink("#about")} onClick={() => setIsOpen(false)}>
                About Us
              </a>
            </li>
            <li>
              <a href={getLink("#location")} onClick={() => setIsOpen(false)}>
                Location
              </a>
            </li>
            <li>
              <Link href="/directory" onClick={() => setIsOpen(false)}>
                Directory
              </Link>
            </li>
            <li>
              <a href={getLink("#contact")} onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
