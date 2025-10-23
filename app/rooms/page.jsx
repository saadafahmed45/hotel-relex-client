import React from "react";
import { hotelsData } from "../api/api";
import RoomsCard from "../components/RoomsCard";

const Rooms = async () => {
  const hotelData = await hotelsData();

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-16 text-gray-800 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Header Section */}
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Guests’ Favorite Rooms
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Discover the most loved rooms by our guests — elegant, cozy, and
              perfect for your stay.
            </p>
            <div className="mx-auto h-1 w-24 rounded-full bg-blue-600"></div>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {hotelData.map((item) => (
              <div
                key={item._id}
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <RoomsCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;
