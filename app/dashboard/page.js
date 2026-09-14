"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { hotelApiUrl, bookingApi } from "../api/api";
import {
  BedDouble,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
} from "lucide-react";

export default function DashboardOverview() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      setLoading(true);
      try {
        const [hotelsRes, bookingsData] = await Promise.all([
          fetch(hotelApiUrl, { cache: "no-store" })
            .then((r) => r.json())
            .catch(() => []),
          bookingApi().catch(() => []),
        ]);

        setHotels(Array.isArray(hotelsRes) ? hotelsRes : []);
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (e) {
        console.error("Dashboard overview load error:", e);
      } finally {
        setLoading(false);
      }
    }

    loadOverview();
  }, []);

  // Compute key statistics
  const totalSanctuaries = hotels.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (acc, b) =>
      acc + (Number(b.totalPrice) || Number(b.customersDetails?.bookingDetails?.totalPrice) || 0),
    0
  );
  const avgRate =
    hotels.length > 0
      ? Math.round(
          hotels.reduce((acc, h) => acc + (Number(h.price) || 0), 0) /
            hotels.length
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-sm p-6 sm:p-10 border border-stone-800 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-amber-400 block font-sans">
            EXECUTIVE CONCIERGE ATELIER
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-normal">
            Hotel Relex Sanctuary Portal
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            Welcome to the centralized operations portal. Oversee room catalogs, configure pricing and specifications, and manage live reservations in real time.
          </p>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden lg:block">
          <span className="font-serif text-9xl tracking-tighter">RELEX</span>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Sanctuaries */}
        <Link
          href="/dashboard/manageHotel"
          className="group bg-white p-6 rounded-sm border border-stone-200 shadow-sm hover:border-amber-400 hover:shadow-md transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Active Sanctuaries
            </span>
            <div className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {loading ? "..." : totalSanctuaries}
          </div>
          <div className="text-[11px] text-stone-500 flex items-center gap-1">
            <span>Live in database catalog</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-900 transition" />
          </div>
        </Link>

        {/* Metric 2: Reservations */}
        <Link
          href="/dashboard/booking"
          className="group bg-white p-6 rounded-sm border border-stone-200 shadow-sm hover:border-amber-400 hover:shadow-md transition space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Total Reservations
            </span>
            <div className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {loading ? "..." : totalBookings}
          </div>
          <div className="text-[11px] text-stone-500 flex items-center gap-1">
            <span>Guest bookings recorded</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-900 transition" />
          </div>
        </Link>

        {/* Metric 3: Total Revenue */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Booked Volume
            </span>
            <div className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-700">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {loading ? "..." : `$${totalRevenue.toLocaleString()}`}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Cumulative gross reservations</span>
          </div>
        </div>

        {/* Metric 4: Average Nightly Rate */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Avg Nightly Rate
            </span>
            <div className="w-8 h-8 rounded-sm bg-stone-100 flex items-center justify-center text-stone-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-stone-900">
            {loading ? "..." : `$${avgRate}`}
          </div>
          <div className="text-[11px] text-stone-500">
            <span>Across all room categories</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Actions */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-serif font-semibold text-stone-900 pb-2 border-b border-stone-100">
            Administrative Shortcuts
          </h2>

          <div className="space-y-2.5">
            <Link
              href="/dashboard/addHotel"
              className="flex items-center justify-between p-3.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs uppercase tracking-wider font-semibold transition"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4 text-amber-700" />
                <span>Publish New Sanctuary</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>

            <Link
              href="/dashboard/manageHotel"
              className="flex items-center justify-between p-3.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs uppercase tracking-wider font-semibold transition"
            >
              <div className="flex items-center gap-3">
                <BedDouble className="w-4 h-4 text-stone-600" />
                <span>Inventory & Room Editor</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>

            <Link
              href="/dashboard/booking"
              className="flex items-center justify-between p-3.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs uppercase tracking-wider font-semibold transition"
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4 text-stone-600" />
                <span>Guest Reservations Desk</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>

            <Link
              href="/rooms"
              target="_blank"
              className="flex items-center justify-between p-3.5 rounded-sm bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs uppercase tracking-wider font-semibold transition"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-stone-600" />
                <span>Preview Guest Catalog</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
          </div>
        </div>

        {/* Right: Recent Reservations Preview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h2 className="text-base font-serif font-semibold text-stone-900">
              Recent Guest Reservations
            </h2>
            <Link
              href="/dashboard/booking"
              className="text-xs text-amber-800 hover:text-amber-900 uppercase tracking-wider font-semibold"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-stone-500">
              Loading recent reservations...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No reservations recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-stone-400 uppercase tracking-wider border-b border-stone-100 font-medium">
                  <tr>
                    <th className="py-2.5 px-2">Guest</th>
                    <th className="py-2.5 px-2">Sanctuary</th>
                    <th className="py-2.5 px-2">Dates</th>
                    <th className="py-2.5 px-2 text-right">Total</th>
                    <th className="py-2.5 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.slice(0, 5).map((b, i) => {
                    const fname = b.firstname || b.customersDetails?.firstname || "Guest";
                    const lname = b.lastname || b.customersDetails?.lastname || "";
                    const roomName =
                      b.hotelName ||
                      b.customersDetails?.bookingDetails?.hotel?.name ||
                      "Sanctuary";
                    const checkIn =
                      b.checkIn || b.customersDetails?.bookingDetails?.checkIn || "-";
                    const total =
                      b.totalPrice ||
                      b.customersDetails?.bookingDetails?.totalPrice ||
                      0;

                    return (
                      <tr key={b._id || i} className="hover:bg-stone-50 transition">
                        <td className="py-3 px-2 font-medium text-stone-900">
                          {fname} {lname}
                        </td>
                        <td className="py-3 px-2 text-stone-600 truncate max-w-[140px]">
                          {roomName}
                        </td>
                        <td className="py-3 px-2 text-stone-500">
                          {checkIn}
                        </td>
                        <td className="py-3 px-2 text-right font-serif font-bold text-stone-900">
                          ${total}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
