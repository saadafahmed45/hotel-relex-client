"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Users,
  Bed,
  Maximize2,
  Check,
  Calendar,
  ShieldCheck,
  Coffee,
  Wifi,
  Tv,
  Wind,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { getRoomById, hotelsData, submitBooking } from "../../api/api";
import { LUXURY_ROOMS } from "../../../lib/data";

export default function RoomDetailsPage() {
  const params = useParams();
  const roomId = params?.id;

  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [roomsCount, setRoomsCount] = useState("1");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [relatedRooms, setRelatedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guest details form state
  const [guestForm, setGuestForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  useEffect(() => {
    // Dates initialization
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

    async function loadData() {
      setLoading(true);
      try {
        const current = await getRoomById(roomId);
        setRoom(current);
        setActiveImage(current?.gallery?.[0] || current?.image);

        const all = await hotelsData();
        setRelatedRooms(all.filter((r) => r._id !== current._id && r.slug !== current.slug).slice(0, 3));
      } catch (e) {
        console.error("Room fetch failed:", e);
      } finally {
        setLoading(false);
      }
    }

    if (roomId) loadData();
  }, [roomId]);

  if (loading || !room) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-24">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-2 border-charcoal border-t-gold rounded-full animate-spin mx-auto" />
          <p className="font-serif text-charcoal text-lg">Preparing Sanctuary Dossier...</p>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const diff = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const subtotal = (room.price || 350) * nights * parseInt(roomsCount || 1, 10);
  const serviceCharge = Math.round(subtotal * 0.1);
  const total = subtotal + serviceCharge;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      firstname: guestForm.firstName.trim(),
      lastname: guestForm.lastName.trim(),
      email: guestForm.email.trim(),
      phoneNumber: guestForm.phone.trim(),
      specialRequests: guestForm.specialRequests.trim(),
      roomsQuantity: roomsCount,
      adult: guests,
      children: "0",
      checkIn,
      checkOut,
      nights,
      totalPrice: total,
      hotelId: room._id,
      hotelName: room.name,
      createdAt: new Date().toISOString(),
    };

    try {
      await submitBooking(bookingPayload);
      setIsBookingSuccess(true);
    } catch (err) {
      alert("Booking encountered an issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryImages = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  return (
    <div className="pt-24 pb-20 bg-ivory">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 border-b border-stone-border">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-charcoal-muted uppercase tracking-wider">
            <Link href="/" className="hover:text-charcoal transition">Home</Link>
            <span className="text-stone-300">/</span>
            <Link href="/rooms" className="hover:text-charcoal transition">Rooms & Suites</Link>
            <span className="text-stone-300">/</span>
            <span className="text-charcoal font-medium">{room.name}</span>
          </nav>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal transition uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Sanctuaries</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-12">
        {/* Full-width Image Showcase with Thumbnail Strip */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-sm overflow-hidden border border-stone-200 shadow-xl bg-stone-200">
            <Image
              src={activeImage || room.image}
              alt={room.name}
              fill
              priority
              className="object-cover transition-all duration-500"
            />
            <div className="absolute top-6 left-6 bg-charcoal/80 backdrop-blur-md px-4 py-1.5 rounded-sm text-xs font-subheading tracking-[0.2em] text-white">
              {room.category || "SANCTUARY"}
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[16/10] rounded-sm overflow-hidden border transition ${
                    activeImage === img ? "border-charcoal ring-2 ring-gold" : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content & Sticky Booking Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: Room Specifications & Story */}
          <div className="lg:col-span-7 space-y-10">
            {/* Title & Headline */}
            <div className="space-y-3 pb-8 border-b border-stone-border">
              <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                {room.tagline || "DESIGNED FOR EFFORTLESS COMFORT"}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
                {room.name}
              </h1>
              <p className="text-sm text-charcoal-muted leading-relaxed font-light">
                {room.description}
              </p>
            </div>

            {/* Key Dimension & Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border border-stone-border rounded-sm text-center">
              <div className="space-y-1">
                <Users className="w-5 h-5 text-gold mx-auto" />
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Capacity</span>
                <span className="font-serif text-sm font-semibold text-charcoal block">{room.guests || "2 Guests"}</span>
              </div>
              <div className="space-y-1">
                <Bed className="w-5 h-5 text-gold mx-auto" />
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Bedding</span>
                <span className="font-serif text-sm font-semibold text-charcoal block">{room.bed || "King Bed"}</span>
              </div>
              <div className="space-y-1">
                <Maximize2 className="w-5 h-5 text-gold mx-auto" />
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Dimensions</span>
                <span className="font-serif text-sm font-semibold text-charcoal block">{room.size || "45 m²"}</span>
              </div>
              <div className="space-y-1">
                <Eye className="w-5 h-5 text-gold mx-auto" />
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Perspective</span>
                <span className="font-serif text-sm font-semibold text-charcoal block">{room.view?.split("&")[0] || "Oceanfront"}</span>
              </div>
            </div>

            {/* Comprehensive Amenities Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-charcoal font-semibold">
                Sanctuary Inclusions & Comforts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(room.amenities || [
                  "Plush King-size bed with Egyptian cotton",
                  "Walk-in Italian rain shower",
                  "Complimentary high-speed fiber Wi-Fi",
                  "Nespresso coffee machine & tea atelier",
                  "65-inch OLED 4K Smart TV",
                  "Bespoke Diptyque bathroom amenities",
                  "Curated minibar with artisan spirits",
                  "Twice-daily housekeeping with turndown",
                ]).map((amenity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-200 rounded-sm text-xs text-charcoal">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="space-y-3 p-6 bg-white border border-stone-border rounded-sm text-xs text-charcoal-muted leading-relaxed">
              <h4 className="font-serif text-base font-semibold text-charcoal">Arrival & Stay Guidelines</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Check-in begins at 3:00 PM; Check-out is until 12:00 PM (Late check-out available on request).</li>
                <li>Complimentary cancellation up to 48 hours prior to arrival.</li>
                <li>Non-smoking throughout all indoor sanctuaries. Dedicated ocean terraces permit relaxation.</li>
                <li>Child & infant cribs provided complimentary upon reservation request.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Sticky Interactive Reservation Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-stone-300 rounded-sm shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex items-baseline justify-between border-b border-stone-border pb-5">
                <div>
                  <span className="text-[10px] font-subheading tracking-widest text-charcoal-muted uppercase block">
                    BEST AVAILABLE RATE
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-bold text-charcoal">${room.price}</span>
                    <span className="text-xs text-charcoal-muted">/ night</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gold font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Breakfast Included</span>
                </div>
              </div>

              {isBookingSuccess ? (
                <div className="p-6 bg-stone-50 border border-gold/40 text-center space-y-4 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl text-charcoal font-semibold">
                    Reservation Requested!
                  </h4>
                  <p className="text-xs text-charcoal-muted">
                    We have reserved {room.name} for your selected dates. A confirmation summary has been registered with our front desk.
                  </p>
                  <button
                    onClick={() => setIsBookingSuccess(false)}
                    className="text-xs uppercase tracking-wider text-charcoal font-medium underline"
                  >
                    Make another reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-subheading tracking-wider text-charcoal-muted uppercase block mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-subheading tracking-wider text-charcoal-muted uppercase block mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                  </div>

                  {/* Guests & Rooms */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-subheading tracking-wider text-charcoal-muted uppercase block mb-1">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-subheading tracking-wider text-charcoal-muted uppercase block mb-1">
                        Suites
                      </label>
                      <select
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      >
                        <option value="1">1 Suite</option>
                        <option value="2">2 Suites</option>
                      </select>
                    </div>
                  </div>

                  {/* Guest Contact Inputs */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name *"
                        required
                        value={guestForm.firstName}
                        onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                        className="p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      />
                      <input
                        type="text"
                        placeholder="Last Name *"
                        required
                        value={guestForm.lastName}
                        onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                        className="p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={guestForm.email}
                      onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={guestForm.phone}
                      onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>

                  {/* Price Calculation Breakdown */}
                  <div className="pt-4 border-t border-stone-border space-y-2 text-xs text-charcoal-muted">
                    <div className="flex justify-between">
                      <span>${room.price} × {nights} nights</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service & Local Heritage Fee (10%)</span>
                      <span>${serviceCharge}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-border text-sm font-semibold text-charcoal">
                      <span>Total Stay</span>
                      <span className="font-serif text-lg font-bold text-gold">${total} USD</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-charcoal text-white hover:bg-black font-medium text-xs uppercase tracking-[0.2em] rounded-sm transition shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Confirming..." : "Reserve This Sanctuary"}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal-muted text-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>No upfront charge. Pay upon check-in.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related Rooms */}
        {relatedRooms.length > 0 && (
          <div className="pt-16 border-t border-stone-border space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-subheading tracking-[0.25em] text-gold uppercase font-semibold">
                EXPLORE FURTHER
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-charcoal font-normal">
                Other Sanctuaries You May Like
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRooms.map((rel) => (
                <div key={rel._id} className="group bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-5 space-y-3">
                    <h4 className="font-serif text-xl font-semibold text-charcoal">{rel.name}</h4>
                    <span className="font-serif text-sm text-gold block font-semibold">${rel.price} / night</span>
                    <Link
                      href={`/rooms/${rel.slug || rel._id}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-charcoal hover:text-gold transition font-medium"
                    >
                      <span>View Sanctuary</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
