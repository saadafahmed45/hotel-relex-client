"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Users, BedDouble, ChevronDown, Sparkles } from "lucide-react";
import BookingModal from "./BookingModal";

export default function BookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setCheckIn(`${yyyy}-${mm}-${dd}`);

    const future = new Date();
    future.setDate(future.getDate() + 3);
    const fYyyy = future.getFullYear();
    const fMm = String(future.getMonth() + 1).padStart(2, "0");
    const fDd = String(future.getDate()).padStart(2, "0");
    setCheckOut(`${fYyyy}-${fMm}-${fDd}`);
  }, []);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto">
        <form
          onSubmit={handleCheckAvailability}
          className="bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xl p-4 sm:p-5 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x lg:divide-stone-200 rounded-sm"
        >
          {/* Field 1: Check-in */}
          <div className="lg:px-5 flex flex-col justify-center">
            <label className="text-[10px] font-subheading tracking-[0.2em] text-charcoal-muted uppercase mb-1 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3 h-3 text-gold" /> Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm font-serif font-semibold text-charcoal focus:outline-none cursor-pointer"
            />
          </div>

          {/* Field 2: Check-out */}
          <div className="lg:px-5 flex flex-col justify-center">
            <label className="text-[10px] font-subheading tracking-[0.2em] text-charcoal-muted uppercase mb-1 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3 h-3 text-gold" /> Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm font-serif font-semibold text-charcoal focus:outline-none cursor-pointer"
            />
          </div>

          {/* Field 3: Guests */}
          <div className="lg:px-5 flex flex-col justify-center">
            <label className="text-[10px] font-subheading tracking-[0.2em] text-charcoal-muted uppercase mb-1 flex items-center gap-1.5 font-medium">
              <Users className="w-3 h-3 text-gold" /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm font-serif font-semibold text-charcoal focus:outline-none cursor-pointer"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Guests (Family)</option>
            </select>
          </div>

          {/* Field 4: Rooms */}
          <div className="lg:px-5 flex flex-col justify-center">
            <label className="text-[10px] font-subheading tracking-[0.2em] text-charcoal-muted uppercase mb-1 flex items-center gap-1.5 font-medium">
              <BedDouble className="w-3 h-3 text-gold" /> Rooms
            </label>
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full bg-transparent text-sm font-serif font-semibold text-charcoal focus:outline-none cursor-pointer"
            >
              <option value="1">1 Suite / Room</option>
              <option value="2">2 Suites / Rooms</option>
              <option value="3">3 Suites / Rooms</option>
            </select>
          </div>

          {/* Field 5: Action Button */}
          <div className="lg:pl-5 flex items-center justify-center pt-2 sm:pt-0">
            <button
              type="submit"
              className="w-full h-full min-h-[46px] bg-charcoal text-white hover:bg-black font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm shadow flex items-center justify-center gap-2 group px-4"
            >
              <span>Check Availability</span>
            </button>
          </div>
        </form>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDates={{ checkIn, checkOut }}
      />
    </>
  );
}
