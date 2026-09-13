"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Calendar, Phone, ChevronRight } from "lucide-react";
import BookingModal from "../components/BookingModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [langDropdown, setLangDropdown] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Monitor scroll state for smooth transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Rooms", href: "/#rooms" },
    { name: "Experience", href: "/#experience" },
    { name: "Dining", href: "/#dining" },
    { name: "Offers", href: "/#offers" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Location", href: "/#location" },
  ];

  const isHome = pathname === "/";
  // On non-home pages, keep navbar solid ivory for clear contrast
  const showSolidNav = !isHome || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolidNav
            ? "bg-ivory/95 backdrop-blur-md border-b border-stone-border py-4 shadow-sm"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* LEFT: Hotel Relex Brand */}
          <Link
            href="/"
            className="flex flex-col items-start leading-none group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span
              className={`font-serif text-2xl lg:text-3xl tracking-wider font-semibold transition-colors duration-300 ${
                showSolidNav ? "text-charcoal" : "text-white"
              }`}
            >
              HOTEL RELEX
            </span>
            <span
              className={`text-[8px] font-subheading tracking-[0.3em] uppercase mt-1 transition-colors duration-300 ${
                showSolidNav ? "text-gold-dark" : "text-gold"
              }`}
            >
              RESORT & SUITES
            </span>
          </Link>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-sans tracking-[0.14em] uppercase transition-colors duration-200 hover:text-gold relative py-1 group ${
                  showSolidNav ? "text-charcoal-muted hover:text-charcoal" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase transition ${
                  showSolidNav ? "text-charcoal-muted hover:text-charcoal" : "text-white/80 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 py-1.5 w-24 bg-white border border-stone-border shadow-lg rounded-sm text-xs text-charcoal z-50">
                  {["EN", "ES", "FR", "DE"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdown(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-stone-100 transition"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Link */}
            <Link
              href="/#contact"
              className={`text-xs tracking-widest uppercase transition ${
                showSolidNav ? "text-charcoal-muted hover:text-charcoal" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </Link>

            {/* Primary Booking CTA */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 rounded-sm flex items-center gap-2 shadow-sm ${
                showSolidNav
                  ? "bg-charcoal text-white hover:bg-black hover:shadow"
                  : "bg-white text-charcoal hover:bg-gold hover:text-white"
              }`}
            >
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* MOBILE: Menu Trigger */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-medium rounded-sm ${
                showSolidNav ? "bg-charcoal text-white" : "bg-white text-charcoal"
              }`}
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition ${showSolidNav ? "text-charcoal" : "text-white"}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ivory flex flex-col justify-between p-8 lg:hidden animate-fade-in pt-24">
          <div className="space-y-8">
            <span className="text-[10px] font-subheading tracking-[0.3em] text-gold font-semibold block">
              HOTEL RELEX SANCTUARY
            </span>
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl sm:text-3xl text-charcoal hover:text-gold transition flex items-center justify-between border-b border-stone-200 pb-3"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-5 h-5 text-stone-400" />
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-charcoal hover:text-gold transition flex items-center justify-between border-b border-stone-200 pb-3"
              >
                <span>About</span>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </Link>
            </nav>
          </div>

          <div className="space-y-5 border-t border-stone-200 pt-6">
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>Direct Inquiries</span>
              <a href="tel:+18005557353" className="font-medium text-charcoal hover:text-gold">
                +1 (800) 555-RELEX
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full py-4 bg-charcoal text-white hover:bg-black uppercase tracking-widest text-xs font-medium rounded-sm transition flex items-center justify-center gap-2"
            >
              <span>Book Your Stay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Dedicated Booking Flow Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
