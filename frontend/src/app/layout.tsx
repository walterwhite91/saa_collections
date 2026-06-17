import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

import { StoreProvider } from "@/context/StoreContext";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "SAA Collection | Fairycore dreams, Nepali soul",
  description: "Romantic dresses, natural beauty, and elegant details inspired by Himalayan femininity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-linen text-moss">
        <StoreProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
