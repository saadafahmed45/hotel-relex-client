import React from "react";
import Hero from "./components/Hero";
import WelcomeSection from "./components/WelcomeSection";
import RoomsSection from "./components/RoomsSection";
import ExperienceSection from "./components/ExperienceSection";
import DiningSection from "./components/DiningSection";
import OffersSection from "./components/OffersSection";
import WhyHotelRelex from "./components/WhyHotelRelex";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import LocationSection from "./components/LocationSection";
import BookingCTA from "./components/BookingCTA";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Hero with Floating Booking Bar */}
      <Hero />

      {/* 2. Welcome & Architectural Narrative */}
      <WelcomeSection />

      {/* 3. Luxury Rooms & Suites Showcase */}
      <RoomsSection />

      {/* 4. Hotel Experience & Bespoke Amenities */}
      <ExperienceSection />

      {/* 5. Fine Dining & Gourmet Atelier */}
      <DiningSection />

      {/* 6. Curated Packages & Special Offers */}
      <OffersSection />

      {/* 7. Why Hotel Relex (01-05 Pillars) */}
      <WhyHotelRelex />

      {/* 8. Verified Guest Testimonials */}
      <Testimonials />

      {/* 9. Hotel Photo Gallery & Fullscreen Lightbox */}
      <Gallery />

      {/* 10. Location, Distances & Directions */}
      <LocationSection />

      {/* 11. Final High-Conversion Booking CTA */}
      <BookingCTA />
    </>
  );
}
