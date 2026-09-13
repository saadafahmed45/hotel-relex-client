import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block space-y-1">
              <span className="font-serif text-2xl sm:text-3xl tracking-wider font-semibold text-white block">
                HOTEL RELEX
              </span>
              <span className="text-[9px] font-subheading tracking-[0.25em] text-gold block">
                RESORT & SANCTUARY
              </span>
            </Link>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">
              Where comfort meets exceptional hospitality. A contemporary coastal sanctuary dedicated to quiet luxury and restorative living.
            </p>
            <div className="pt-2">
              <span className="text-xs text-gold/90 font-serif italic">
                Member of The International Luxury Hotel Collection
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-subheading tracking-[0.2em] text-white/90 uppercase font-semibold">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-light tracking-wide uppercase">
              <li>
                <Link href="/#rooms" className="hover:text-gold transition">Rooms & Suites</Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-gold transition">Experiences & Spa</Link>
              </li>
              <li>
                <Link href="/#dining" className="hover:text-gold transition">Fine Dining & Atelier</Link>
              </li>
              <li>
                <Link href="/#offers" className="hover:text-gold transition">Curated Privileges</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-gold transition">Visual Gallery</Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-gold transition">Location & Arrival</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-subheading tracking-[0.2em] text-white/90 uppercase font-semibold">
              CONTACT & CONCIERGE
            </h4>
            <ul className="space-y-3 text-xs text-white/65 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>108 Ocean Boulevard, Seaside Sanctuary Bay, NY 11964</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+18005557353" className="hover:text-white transition">
                  +1 (800) 555-RELEX
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:concierge@hotelrelex.com" className="hover:text-white transition">
                  concierge@hotelrelex.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-subheading tracking-[0.2em] text-white/90 uppercase font-semibold">
              SOCIAL
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-light">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-gold" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Facebook className="w-3.5 h-3.5 text-gold" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Youtube className="w-3.5 h-3.5 text-gold" />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Hotel Relex. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white/70 transition">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white/70 transition">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
