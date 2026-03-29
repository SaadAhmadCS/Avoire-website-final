

import { Noto_Serif, Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer";
import Providers from "./providers";
import Navbar from "./Components/Navbar/Navbar";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AVOIRE — Luxury Parfumerie",
  description:
    "Crafting sensory experiences through rare essences. Designed in Paris, inspired by the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${notoSerif.variable} ${inter.variable} antialiased selection:bg-accent/30`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
