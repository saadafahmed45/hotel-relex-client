"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RoomDetails = ({ params }) => {
  const id = params?.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  // ✅ Get today’s date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // ✅ Fetch room details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://hotel-relex-server.onrender.com/hotels/${id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch room details");
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ✅ Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;

    const checkIn = new Date(form.checkIn.value);
    const checkOut = new Date(form.checkOut.value);

    if (checkOut <= checkIn) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "Check-out date must be after check-in date.",
      });
      return;
    }

    const daysDiff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const bookingData = {
      firstname: form.firstname.value.trim(),
      lastname: form.lastname.value.trim(),
      email: form.email.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      roomsQuantity: form.roomsQuantity.value,
      adult: form.adult.value,
      children: form.children.value,
      checkIn: form.checkIn.value,
      checkOut: form.checkOut.value,
      totalPrice: daysDiff * (data?.price || 0),
      hotelId: data?._id,
      hotelName: data?.name,
    };

    try {
      const res = await fetch(
        "https://hotel-relex-server.onrender.com/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );

      if (!res.ok) throw new Error("Booking request failed");

      Swal.fire({
        icon: "success",
        title: "Room Booked Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      setIsPopupOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: err.message || "Please try again later.",
      });
    }
  };

  // ✅ Loading and error handling
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-violet-600"></div>
      </div>
    );

  if (error)
    return (
      <p className="mt-10 text-center text-red-600">
        Failed to load room details. {error}
      </p>
    );

  if (!data)
    return (
      <p className="mt-10 text-center text-gray-500">No room data available.</p>
    );

  return (
    <div className="px-4 py-16 lg:px-24">
      {/* ✅ Breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="w-full bg-white p-4 text-gray-800"
      >
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link href="/" className="text-gray-600 hover:underline">
              Home
            </Link>
          </li>
          <span className="text-gray-400">/</span>
          <li className="font-medium text-violet-600">Room Details</li>
        </ol>
      </nav>

      {/* ✅ Room Info */}
      <div className="mt-8 flex flex-col items-center justify-center gap-6 lg:flex-row">
        <img
          src={data?.image}
          alt={data?.name || "Room Image"}
          className="w-full max-w-2xl rounded-lg shadow-lg"
        />
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold">{data?.name}</h3>
          <p className="text-gray-600">{data?.description}</p>

          {data?.amenities?.length > 0 && (
            <div>
              <h4 className="font-semibold">Amenities:</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {data.amenities.map((a, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 fill-current text-violet-600"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h2 className="text-2xl font-bold text-violet-600">
            ${data?.price}{" "}
            <span className="text-sm text-gray-600">/ night</span>
          </h2>

          {/* ✅ Book Now Button */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="mt-4 rounded bg-violet-600 px-6 py-2 font-semibold text-white transition hover:bg-violet-700"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ✅ Booking Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="mb-4 text-center text-2xl font-semibold text-violet-600">
              Book Your Room
            </h3>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Dates */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">Check In</label>
                  <input
                    type="date"
                    name="checkIn"
                    defaultValue={currentDate}
                    className="w-full rounded border p-2 focus:ring-2 focus:ring-violet-600"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Check Out</label>
                  <input
                    type="date"
                    name="checkOut"
                    className="w-full rounded border p-2 focus:ring-2 focus:ring-violet-600"
                    required
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  className="rounded border p-2 focus:ring-2 focus:ring-violet-600"
                  required
                />
                <input
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  className="rounded border p-2 focus:ring-2 focus:ring-violet-600"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="col-span-2 rounded border p-2 focus:ring-2 focus:ring-violet-600"
                  required
                />
                <input
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  className="col-span-2 rounded border p-2 focus:ring-2 focus:ring-violet-600"
                  required
                />
              </div>

              {/* Room & Guest Selections */}
              <div className="grid grid-cols-3 gap-4">
                <select
                  name="roomsQuantity"
                  className="rounded border p-2 focus:ring-2 focus:ring-violet-600"
                >
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                </select>
                <select
                  name="adult"
                  className="rounded border p-2 focus:ring-2 focus:ring-violet-600"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                </select>
                <select
                  name="children"
                  className="rounded border p-2 focus:ring-2 focus:ring-violet-600"
                >
                  <option value="0">0 Child</option>
                  <option value="1">1 Child</option>
                  <option value="2">2 Children</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded bg-violet-600 py-2 font-semibold text-white transition hover:bg-violet-700"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
