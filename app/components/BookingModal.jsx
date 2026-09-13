"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Users, CheckCircle, BedDouble, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import { LUXURY_ROOMS } from "../../lib/data";
import { submitBooking } from "../api/api";

export default function BookingModal({ isOpen, onClose, initialRoom = null, initialDates = null }) {
  const [step, setStep] = useState(1); // 1: Room & Dates, 2: Guest Details, 3: Confirmed
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoom?._id || LUXURY_ROOMS[0]._id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomsCount, setRoomsCount] = useState("1");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Initialize dates
  useEffect(() => {
    if (initialDates?.checkIn) {
      setCheckIn(initialDates.checkIn);
    } else {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      setCheckIn(`${yyyy}-${mm}-${dd}`);
    }

    if (initialDates?.checkOut) {
      setCheckOut(initialDates.checkOut);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const dd = String(tomorrow.getDate()).padStart(2, "0");
      setCheckOut(`${yyyy}-${mm}-${dd}`);
    }

    if (initialRoom?._id) {
      setSelectedRoomId(initialRoom._id);
    }
  }, [initialRoom, initialDates, isOpen]);

  if (!isOpen) return null;

  const currentRoom = LUXURY_ROOMS.find((r) => r._id === selectedRoomId) || LUXURY_ROOMS[0];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const diff = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const subtotal = currentRoom.price * nights * parseInt(roomsCount || 1, 10);
  const serviceCharge = Math.round(subtotal * 0.1);
  const total = subtotal + serviceCharge;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    setStep(2);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      firstname: formData.firstName.trim(),
      lastname: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      specialRequests: formData.specialRequests.trim(),
      roomsQuantity: roomsCount,
      adult: guests,
      children: "0",
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      totalPrice: total,
      hotelId: currentRoom._id,
      hotelName: currentRoom.name,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await submitBooking(bookingPayload);
      setConfirmedBooking({
        ...bookingPayload,
        referenceId: "RELEX-" + Math.floor(100000 + Math.random() * 900000),
      });
      setStep(3);
    } catch (err) {
      alert("Booking encountered an issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ivory border border-stone-300 rounded-sm shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-stone-border bg-stone-100">
          <div>
            <span className="text-[11px] font-subheading tracking-[0.2em] text-gold font-medium block">
              HOTEL RELEX SANCTUARY
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-charcoal font-semibold">
              {step === 1 && "Reserve Your Stay"}
              {step === 2 && "Guest Information & Confirmation"}
              {step === 3 && "Reservation Confirmed"}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-stone-200 transition rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="grid grid-cols-2 text-xs border-b border-stone-border">
            <div
              className={`py-2.5 px-6 font-medium text-center transition ${
                step === 1
                  ? "bg-ivory text-charcoal border-b-2 border-charcoal font-semibold"
                  : "bg-stone-50 text-charcoal-muted"
              }`}
            >
              1. Dates & Room
            </div>
            <div
              className={`py-2.5 px-6 font-medium text-center transition ${
                step === 2
                  ? "bg-ivory text-charcoal border-b-2 border-charcoal font-semibold"
                  : "bg-stone-50 text-charcoal-muted"
              }`}
            >
              2. Guest Details & Review
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              {/* Select Room */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-2">
                  Select Room or Suite
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LUXURY_ROOMS.map((room) => (
                    <button
                      key={room._id}
                      type="button"
                      onClick={() => setSelectedRoomId(room._id)}
                      className={`text-left p-3.5 border transition rounded-sm flex flex-col justify-between ${
                        selectedRoomId === room._id
                          ? "border-charcoal bg-white shadow-sm ring-1 ring-charcoal"
                          : "border-stone-border bg-stone-50 hover:bg-white hover:border-stone-400"
                      }`}
                    >
                      <div>
                        <span className="font-serif text-base font-semibold text-charcoal block">
                          {room.name}
                        </span>
                        <span className="text-xs text-charcoal-muted block mt-0.5">
                          {room.bed} • {room.size}
                        </span>
                      </div>
                      <span className="font-serif text-sm font-semibold text-gold mt-2 block">
                        ${room.price} <span className="text-[11px] text-charcoal-muted font-sans">/ night</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Guests & Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Rooms
                  </label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  >
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                    <option value="3">3 Rooms</option>
                  </select>
                </div>
              </div>

              {/* Estimated Summary */}
              <div className="p-4 bg-stone-100 border border-stone-border rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-charcoal-muted block">Estimated Stay ({nights} night{nights > 1 ? "s" : ""})</span>
                  <span className="font-serif text-lg font-semibold text-charcoal">${total}</span>
                  <span className="text-[11px] text-charcoal-muted ml-1.5">(incl. taxes & service)</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-charcoal text-white hover:bg-black font-medium text-xs tracking-widest uppercase transition flex items-center gap-2 rounded-sm"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Booking Recap Bar */}
              <div className="p-4 bg-white border border-stone-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-charcoal-muted block">Selected Sanctuary</span>
                  <span className="font-serif text-base font-semibold text-charcoal">{currentRoom.name}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-charcoal-muted block">{checkIn} to {checkOut} ({nights} nights)</span>
                  <span className="font-serif text-base font-semibold text-gold">${total} USD</span>
                </div>
              </div>

              {/* Guest Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Eleanor"
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Vance"
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="eleanor.vance@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-1.5">
                  Special Requests / Dietary Preferences (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="High floor request, late arrival, anniversary celebration, dietary requirements..."
                  className="w-full px-4 py-2.5 bg-white border border-stone-border text-charcoal text-sm rounded-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              {/* Guarantees */}
              <div className="flex items-center gap-2 text-xs text-charcoal-muted bg-stone-50 p-3 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Complimentary cancellation up to 48 hours prior to arrival. No advance charges made today.</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs uppercase tracking-wider text-charcoal-muted hover:text-charcoal transition"
                >
                  ← Back to Details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-charcoal text-white hover:bg-black font-medium text-xs tracking-widest uppercase transition rounded-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Reservation"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-gold/15 text-gold mx-auto rounded-full flex items-center justify-center border border-gold/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-subheading tracking-[0.2em] text-gold font-semibold">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-serif text-3xl text-charcoal font-semibold">
                  We look forward to welcoming you.
                </h3>
                <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                  A confirmation dossier has been sent to{" "}
                  <span className="text-charcoal font-medium">{confirmedBooking.email}</span>.
                </p>
              </div>

              <div className="p-5 bg-white border border-stone-border rounded-sm max-w-md mx-auto text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-charcoal-muted">Booking Reference:</span>
                  <span className="font-mono font-semibold text-charcoal tracking-wider">
                    {confirmedBooking.referenceId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-charcoal-muted">Room & Suite:</span>
                  <span className="font-medium text-charcoal">{confirmedBooking.hotelName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-charcoal-muted">Dates:</span>
                  <span className="font-medium text-charcoal">
                    {confirmedBooking.checkIn} — {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-charcoal-muted">Total Reserved:</span>
                  <span className="font-serif text-base font-semibold text-gold">
                    ${confirmedBooking.totalPrice} USD
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3 bg-charcoal text-white hover:bg-black text-xs uppercase tracking-widest font-medium rounded-sm transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
