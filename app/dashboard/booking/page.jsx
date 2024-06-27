import { bookingApi } from "@/app/api/api";
import BookingList from "@/app/components/BookingList";
import React from "react";

const Booking = async () => {
  const bookings = await bookingApi();
  console.log(bookings.length);
  return (
    <div>
      <h2>booking length {bookings.length}</h2>

      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Booking list
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Client</th>
                <th className="p-3">Check In</th>
                <th className="p-3">Check Out</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            {bookings.map((booking) => (
              <BookingList booking={booking} key={booking._id} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
