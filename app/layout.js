import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Hotel Relex",
  description: "booking beutiful Hotel for day and night",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <Navbar />
          <div className="min-h-screen mt-10">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
