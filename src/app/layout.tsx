"use client";
import { Navbar } from "../app/components/nav";
import Footer from "../app/components/footer";
import { useEffect, useState, Suspense } from "react";
import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// export const metadata = {
//   title: {
//     template: "%s | Riverland Mall",
//     default: "Riverland Mall",
//   },
//   description: "Mall along Kiambu Road",
//   metadataBase: new URL("https://www.summerix.io"),
//   openGraph: {
//     images: ["/images/cover.png"],
//   },
//   twitter: {
//     card: "summary",
//     creator: "@Riverland Mall",
//     images: ["/images/cover.png"],
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  useEffect(() => {
    const headerHeight = 80;
    const handleScroll = () => {
      setShowHeaderShadow(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
