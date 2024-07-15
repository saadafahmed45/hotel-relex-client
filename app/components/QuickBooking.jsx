"use client";
import { useState } from "react";

const QuickBooking = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adult, setAdult] = useState("1 Adult");
  const [children, setChildren] = useState("1 Children");
  const [room, setRoom] = useState("1 Room");

  const handleCheckNow = () => {
    const bookingDetails = {
      checkIn,
      checkOut,
      adult,
      children,
      room,
    };
    console.log(bookingDetails);
  };

  return (
    <div className="mx-5 rounded-sm bg-white/60 py-5 backdrop-blur-sm md:mx-20">
      <div className="select-none px-2 md:px-5">
        <table className="block w-full">
          <tr className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-0">
            {/* input for check in or out */}
            <td className="border-[1px] border-black p-2">
              <input
                className="w-full bg-transparent"
                type="date"
                name="check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </td>
            <td className="border-[1px] border-black p-2">
              <input
                type="date"
                className="w-full bg-transparent"
                name="check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </td>
            {/* select option */}
            <td className="w-full border-[1px] border-black p-2">
              <select
                id="adult"
                className="w-full bg-transparent"
                value={adult}
                onChange={(e) => setAdult(e.target.value)}
              >
                <option className="w-full" value="1 Adult">
                  1 Adult
                </option>
                <option className="w-full" value="2 Adult">
                  2 Adult
                </option>
                <option className="w-full" value="3 Adult">
                  3 Adult
                </option>
                <option className="w-full" value="4 Adult">
                  4 Adult
                </option>
              </select>
            </td>
            <td className="border-[1px] border-black p-2">
              <select
                className="w-full bg-transparent"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                <option value="1 Children">1 Children</option>
                <option value="2 Children">2 Children</option>
                <option value="3 Children">3 Children</option>
                <option value="4 Children">4 Children</option>
              </select>
            </td>
            <td className="border-[1px] border-black p-2">
              <select
                className="h-full w-full bg-transparent"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="1 Room">1 Room</option>
                <option value="2 Room">2 Room</option>
                <option value="3 Room">3 Room</option>
                <option value="4 Room">4 Room</option>
              </select>
            </td>
            <td className="border-[1px] border-black bg-white p-2">
              <button className="block h-full w-full" onClick={handleCheckNow}>
                check now
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default QuickBooking;
