import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Hotel Relex | Luxury Boutique Hotel & Suites",
  description:
    "Experience luxury minimalism, world-class hospitality, and unforgettable stays at Hotel Relex. Explore our thoughtfully designed rooms, bespoke wellness, and fine dining.",
  keywords: [
    "Hotel Relex",
    "Luxury Hotel",
    "Boutique Hotel",
    "Hotel Rooms",
    "Hotel Booking",
    "Luxury Hospitality",
    "Hotel Suites",
  ],
  openGraph: {
    title: "Hotel Relex | Where Comfort Meets Exceptional Hospitality",
    description:
      "A sanctuary of quiet luxury, bespoke service, and refined comfort. Book your stay at Hotel Relex.",
    url: "https://hotel-relex.vercel.app",
    siteName: "Hotel Relex",
    images: [
      {
        url: "/s1.webp",
        width: 1200,
        height: 630,
        alt: "Hotel Relex Luxury Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal font-sans antialiased min-h-screen flex flex-col selection:bg-gold selection:text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
