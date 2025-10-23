import React from "react";
import { hotelsData } from "../api/api";
import RoomsCard from "../components/RoomsCard";
import Link from "next/link";

const FeatureRooms = async () => {
  const hotelData = await hotelsData();

  return (
    <>
      <section className="mt-8 bg-gray-100 px-[2px] py-8 text-gray-800 sm:py-12 lg:px-16">
        <div className="container mx-auto space-y-8 p-6">
          {/* Section Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Feature Rooms</h2>
            <p className="font-serif text-sm text-gray-600">
              Choose your room — usu at, duo te agam soluta mucius.
            </p>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {hotelData.slice(0, 3).map((item) => (
              <RoomsCard item={item} key={item._id} />
            ))}
          </div>

          {/* See All Button */}
          <div className="mt-8 text-center">
            <Link
              href="/rooms"
              className="inline-block rounded-md bg-violet-600 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-violet-800"
            >
              See All Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureRooms;
