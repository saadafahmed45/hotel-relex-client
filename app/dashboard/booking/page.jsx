"use client";

import React, { useEffect, useState } from "react";
import { bookingApi } from "@/app/api/api";
import BookingList from "@/app/components/BookingList";
import { CalendarCheck, RefreshCw } from "lucide-react";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingApi();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteSuccess = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase block">
              HOTEL RELEX RESERVATION DESK
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal mt-1">
              Guest Reservations
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Live guest bookings retrieved from MongoDB. Total active: {bookings.length}
            </p>
          </div>

          <button
            onClick={fetchBookings}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs tracking-wider uppercase font-medium rounded-sm transition self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Bookings</span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-sm border border-stone-200">
            <div className="w-8 h-8 border-2 border-stone-900 border-t-amber-600 rounded-full animate-spin mx-auto" />
            <p className="text-sm font-serif text-stone-600">Loading reservations from database...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-sm border border-stone-200 p-8">
            <CalendarCheck className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="text-xl font-serif text-stone-900">No Reservations Yet</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto">
              When guests reserve sanctuaries through the website or booking modal, their reservations will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-100 border-b border-stone-200 text-[11px] uppercase tracking-wider text-stone-600 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">Sanctuary</th>
                    <th className="py-3.5 px-4">Guest Information</th>
                    <th className="py-3.5 px-4">Dates</th>
                    <th className="py-3.5 px-4 text-right">Total Price</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {bookings.map((booking, index) => (
                    <BookingList
                      key={booking._id || index}
                      booking={booking}
                      index={index}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
  );
};

export default BookingPage;
