import { ReactNode } from "react";
import { Source_Sans_3 } from "next/font/google";

import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Pick the weights you need
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Riverland Mall",
    default: "Riverland Mall",
  },
  description: "Mall along Kiambu Road",
  metadataBase: new URL("https://www.summerix.io"),
  openGraph: {
    images: ["/images/cover.png"],
  },
  twitter: {
    card: "summary",
    creator: "@Riverland Mall",
    images: ["/images/cover.png"],
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sourceSans3.className} scroll-smooth`}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
