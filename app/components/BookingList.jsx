import React from "react";

const BookingList = ({ booking }) => {
  const hotels = booking?.hotel;
  console.log(hotels?.name);
  return (
    <tbody>
      <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
        <td className="p-3">
          <p>97412378923</p>
        </td>
        <td className="p-3">
          <p>{hotels?.name}</p>
        </td>
        <td className="p-3">
          <p>{booking.checkIn}</p>
          {/* <p className="dark:text-gray-600">Friday</p> */}
        </td>
        <td className="p-3">
          <p>{booking.checkOut}</p>

          {/* <p className="dark:text-gray-600">Tuesday</p> */}
        </td>
        <td className="p-3 text-right">
          <p>${hotels?.price}</p>
        </td>
        <td className="p-3 text-right">
          <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
            <span>Pending</span>
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default BookingList;
