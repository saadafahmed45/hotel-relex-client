"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Printer,
  ChevronRight,
  Sparkles,
  MapPin,
  Bed,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { checkBookingStatus } from "../api/api";
import { LUXURY_ROOMS } from "../../lib/data";

function BookingStatusContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize from search params if present
  useEffect(() => {
    const urlEmail = searchParams?.get("email") || "";
    const urlPhone = searchParams?.get("phone") || searchParams?.get("number") || "";
    if (urlEmail || urlPhone) {
      setEmail(urlEmail);
      setPhone(urlPhone);
      performLookup(urlEmail, urlPhone);
    }
  }, [searchParams]);

  const performLookup = async (lookupEmail, lookupPhone) => {
    const targetEmail = lookupEmail.trim();
    const targetPhone = lookupPhone.trim();

    if (!targetEmail && !targetPhone) {
      setErrorMessage("Please enter an email address or phone number to check reservation status.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await checkBookingStatus({
        email: targetEmail,
        phone: targetPhone,
      });
      setBookings(results || []);
    } catch (err) {
      console.error("Lookup error:", err);
      setErrorMessage("We were unable to retrieve your reservation. Please verify your details or contact our concierge.");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performLookup(email, phone);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find thumbnail for sanctuary
  const getSanctuaryImage = (hotelName) => {
    const matched = LUXURY_ROOMS.find(
      (r) =>
        r.name.toLowerCase().includes((hotelName || "").toLowerCase()) ||
        (hotelName || "").toLowerCase().includes(r.name.toLowerCase())
    );
    return matched ? matched.image : LUXURY_ROOMS[0].image;
  };

  // Status badge styling
  const renderStatusBadge = (status) => {
    const normalized = (status || "Confirmed").toLowerCase();
    if (normalized.includes("cancel")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 text-xs font-medium rounded-full uppercase tracking-wider">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Cancelled</span>
        </span>
      );
    }
    if (normalized.includes("pending")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 text-xs font-medium rounded-full uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Pending Confirmation</span>
        </span>
      );
    }
    if (normalized.includes("in") || normalized.includes("residence")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>In Residence</span>
        </span>
      );
    }
    // Default: Confirmed
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium rounded-full uppercase tracking-wider">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Confirmed & Guaranteed</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 text-gold-dark border border-gold/30 rounded-full text-[11px] font-subheading tracking-[0.25em] uppercase font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reservation Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal tracking-tight">
            Check Booking Status
          </h1>
          <p className="text-charcoal-muted text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Enter your registered email address or phone number to retrieve your reservation status, itinerary details, and sanctuary confirmation.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-sm border border-stone-border shadow-md p-6 sm:p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-charcoal-muted flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alexander@luxury.com"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-charcoal transition"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-charcoal-muted flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 415 555 0192 or 0199234234"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-charcoal transition"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-100">
              <p className="text-xs text-charcoal-muted font-light">
                * You can search with either your email, phone number, or both.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3.5 bg-charcoal hover:bg-black text-white uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition shadow flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5 text-gold" />
                    <span>Retrieve Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {hasSearched && !isLoading && (
          <div className="space-y-8 animate-fade-in">
            {bookings.length === 0 ? (
              /* No Bookings Found */
              <div className="bg-white rounded-sm border border-stone-border shadow-sm p-8 sm:p-12 text-center space-y-4">
                <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal">No Reservations Found</h3>
                <p className="text-charcoal-muted text-sm max-w-md mx-auto font-light leading-relaxed">
                  We could not find any active reservations associated with the email or phone number you provided. Please double-check your credentials or contact our 24/7 concierge desk.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <a
                    href="tel:+18005557353"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white text-xs uppercase tracking-wider rounded-sm hover:bg-black transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>Call Concierge: +1 (800) 555-RELEX</span>
                  </a>
                  <a
                    href="mailto:concierge@hotelrelex.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 text-charcoal text-xs uppercase tracking-wider rounded-sm hover:bg-stone-200 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>Email Concierge</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Bookings Found */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl sm:text-2xl text-charcoal">
                    {bookings.length === 1 ? "1 Reservation Found" : `${bookings.length} Reservations Found`}
                  </h2>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 text-charcoal hover:bg-stone-50 text-xs rounded-sm transition shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5 text-gold" />
                    <span>Print Itinerary</span>
                  </button>
                </div>

                {bookings.map((booking, idx) => {
                  const sanctuaryImg = getSanctuaryImage(booking.hotelName);
                  return (
                    <div
                      key={booking._id || idx}
                      className="bg-white rounded-sm border border-stone-border shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                      {/* Top Bar: Reference & Status */}
                      <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs uppercase tracking-widest font-mono font-semibold text-charcoal">
                            Ref: {booking.referenceId || `RELEX-${String(booking._id).slice(-6).toUpperCase()}`}
                          </span>
                          <span className="text-stone-300">|</span>
                          <span className="text-xs text-charcoal-muted">
                            Booked on {new Date(booking.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                        <div>{renderStatusBadge(booking.status)}</div>
                      </div>

                      {/* Main Booking Details */}
                      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Sanctuary Thumbnail */}
                        <div className="md:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-100">
                          <img
                            src={sanctuaryImg}
                            alt={booking.hotelName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <span className="absolute bottom-2.5 left-3 text-[10px] font-subheading tracking-[0.2em] text-white uppercase font-medium">
                            Hotel Relex Sanctuary
                          </span>
                        </div>

                        {/* Stay & Guest Information */}
                        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                          <div>
                            <span className="text-[10px] font-subheading tracking-[0.25em] text-gold-dark uppercase font-semibold block">
                              SANCTUARY STAY
                            </span>
                            <h3 className="font-serif text-2xl text-charcoal font-medium">
                              {booking.hotelName}
                            </h3>
                          </div>

                          {/* Key Grid Data */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-3 border-y border-stone-100 text-xs">
                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Check-In Date
                              </span>
                              <span className="font-medium text-charcoal font-mono mt-0.5 block">
                                {booking.checkIn || "Pending"}
                              </span>
                            </div>

                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Check-Out Date
                              </span>
                              <span className="font-medium text-charcoal font-mono mt-0.5 block">
                                {booking.checkOut || "Pending"}
                              </span>
                            </div>

                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Duration
                              </span>
                              <span className="font-medium text-charcoal mt-0.5 block">
                                {booking.nights || 1} {booking.nights === 1 ? "Night" : "Nights"}
                              </span>
                            </div>

                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Primary Guest
                              </span>
                              <span className="font-medium text-charcoal mt-0.5 block">
                                {booking.fullName || `${booking.firstname} ${booking.lastname}`.trim() || "Guest"}
                              </span>
                            </div>

                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Contact Email
                              </span>
                              <span className="font-medium text-charcoal mt-0.5 block truncate">
                                {booking.email || "-"}
                              </span>
                            </div>

                            <div>
                              <span className="text-charcoal-muted block uppercase tracking-wider text-[10px]">
                                Phone Number
                              </span>
                              <span className="font-medium text-charcoal font-mono mt-0.5 block">
                                {booking.phoneNumber || "-"}
                              </span>
                            </div>
                          </div>

                          {/* Special Requests */}
                          {booking.specialRequests && (
                            <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm text-xs">
                              <span className="font-semibold text-charcoal block">Special Requests / Preferences:</span>
                              <p className="text-charcoal-muted mt-0.5 italic">{booking.specialRequests}</p>
                            </div>
                          )}

                          {/* Total Price & Footer Actions */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                            <div>
                              <span className="text-[11px] uppercase tracking-wider text-charcoal-muted block">
                                Total Reservation Investment
                              </span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
                                  ${Number(booking.totalPrice || 0).toLocaleString()}
                                </span>
                                <span className="text-xs text-charcoal-muted font-light">
                                  USD (Includes taxes & concierge service)
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href="tel:+18005557353"
                                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-charcoal text-xs uppercase tracking-wider rounded-sm transition"
                              >
                                Concierge
                              </a>
                              <Link
                                href="/#rooms"
                                className="px-4 py-2 bg-charcoal hover:bg-black text-white text-xs uppercase tracking-wider rounded-sm transition flex items-center gap-1"
                              >
                                <span>Explore More</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Concierge Assistance Card */}
        <div className="bg-charcoal text-white rounded-sm p-8 sm:p-10 border border-charcoal-muted/30 relative overflow-hidden shadow-xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-[10px] font-subheading tracking-[0.3em] text-gold uppercase font-semibold block">
              PERSONAL CONCIERGE ASSISTANCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Need to Modify Your Itinerary?
            </h3>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Our hospitality team is at your service 24 hours a day to assist with dates adjustments, suite upgrades, arrival transfers, and customized private dining arrangements.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="tel:+18005557353"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-charcoal text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-gold hover:text-white transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (800) 555-RELEX</span>
              </a>
              <a
                href="mailto:concierge@hotelrelex.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-sm transition"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>concierge@hotelrelex.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-charcoal border-t-gold rounded-full animate-spin mx-auto" />
            <p className="font-serif text-charcoal-muted text-sm">Loading Reservation Concierge...</p>
          </div>
        </div>
      }
    >
      <BookingStatusContent />
    </Suspense>
  );
}
