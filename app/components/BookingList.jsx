"use client";

import React, { useState } from "react";
import { deleteBooking, updateBookingStatus } from "@/app/api/api";
import Swal from "sweetalert2";
import { Trash2, Calendar, User, Phone, Mail, CheckCircle, Clock } from "lucide-react";

const BookingList = ({ booking, index, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(booking?.status || "Confirmed");

  // Safely support both flat luxury booking payload and legacy nested format
  const firstname =
    booking?.firstname ||
    booking?.customersDetails?.firstname ||
    "Guest";
  const lastname =
    booking?.lastname ||
    booking?.customersDetails?.lastname ||
    "";
  const email =
    booking?.email ||
    booking?.customersDetails?.email ||
    "No email";
  const phoneNumber =
    booking?.phoneNumber ||
    booking?.customersDetails?.phoneNumber ||
    "No phone";
  const hotelName =
    booking?.hotelName ||
    booking?.customersDetails?.bookingDetails?.hotel?.name ||
    "Sanctuary Room";
  const checkIn =
    booking?.checkIn ||
    booking?.customersDetails?.bookingDetails?.checkIn ||
    "-";
  const checkOut =
    booking?.checkOut ||
    booking?.customersDetails?.bookingDetails?.checkOut ||
    "-";
  const totalPrice =
    booking?.totalPrice ||
    booking?.customersDetails?.bookingDetails?.totalPrice ||
    0;
  const status = booking?.status || "Confirmed";

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Delete Reservation?",
      text: `Are you sure you want to cancel and delete the reservation for ${firstname} ${lastname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
    });

    if (confirm.isConfirmed) {
      setIsDeleting(true);
      try {
        await deleteBooking(booking._id);
        Swal.fire({
          icon: "success",
          title: "Reservation Deleted",
          timer: 1500,
          showConfirmButton: false,
        });
        if (onDeleteSuccess) {
          onDeleteSuccess(booking._id);
        } else {
          window.location.reload();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Deletion Failed",
          text: err.message,
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setIsUpdating(true);
    try {
      await updateBookingStatus(booking._id, newStatus);
      setCurrentStatus(newStatus);
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Reservation status changed to ${newStatus}.`,
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <tr className="border-b border-stone-200 hover:bg-stone-50 transition text-sm">
      <td className="py-4 px-4 text-center text-xs font-mono text-stone-400">
        #{index + 1}
      </td>

      {/* Sanctuary / Room */}
      <td className="py-4 px-4">
        <p className="font-serif font-semibold text-stone-900">{hotelName}</p>
        {booking?.specialRequests && (
          <p className="text-xs text-stone-500 font-light truncate max-w-xs italic">
            Req: {booking.specialRequests}
          </p>
        )}
      </td>

      {/* Guest Name & Details */}
      <td className="py-4 px-4">
        <div className="space-y-0.5">
          <p className="font-medium text-stone-900">
            {firstname} {lastname}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Mail className="w-3 h-3 text-stone-400" />
            <span className="truncate max-w-[180px]">{email}</span>
          </div>
          {phoneNumber && phoneNumber !== "No phone" && (
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{phoneNumber}</span>
            </div>
          )}
        </div>
      </td>

      {/* Dates */}
      <td className="py-4 px-4 text-xs text-stone-600">
        <div className="flex items-center gap-1 text-stone-800 font-medium">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>{checkIn}</span>
        </div>
        <div className="text-stone-400 pl-4.5">to {checkOut}</div>
      </td>

      {/* Total Price */}
      <td className="py-4 px-4 text-right font-serif font-bold text-stone-900 text-base">
        ${totalPrice}
      </td>

      {/* Status (Editable Dropdown) */}
      <td className="py-4 px-4 text-center">
        <select
          value={currentStatus}
          disabled={isUpdating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 border cursor-pointer focus:outline-none transition ${
            currentStatus === "Confirmed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
              : currentStatus === "Pending"
              ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
              : currentStatus === "In Residence"
              ? "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
              : "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
          }`}
        >
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="In Residence">In Residence</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>

      {/* Action */}
      <td className="py-4 px-4 text-right">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm transition disabled:opacity-50"
          title="Delete reservation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default BookingList;
