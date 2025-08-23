"use client";
import { Navbar } from "../components/nav";
import Footer from "../components/footer";
import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation"; // ✅ import this
import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  useEffect(() => {
    const headerHeight = 80;

    // pages that should toggle on scroll
    const scrollShadowPaths = ["/", "/directory"];

    if (scrollShadowPaths.includes(pathname)) {
      const handleScroll = () => {
        setShowHeaderShadow(window.scrollY > headerHeight);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // run on mount
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // all other pages (e.g. /directory/[slug], /about, etc.)
      setShowHeaderShadow(true);
    }
  }, [pathname]);

  return (
    <html lang="en" className={`${sourceSans3.className} scroll-smooth`}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <Navbar hasShadow={showHeaderShadow} />
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
