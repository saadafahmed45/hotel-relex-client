import React from "react";
import { hotels } from "../api/hotelApi";
import RoomsCard from "../components/RoomsCard";
import { hotelsData } from "../api/api";

const Rooms = async () => {
  // const hotelData = hotels;
  // console.log(hotelData);
  const hotelData = await hotelsData();
  // console.log(data);

  return (
    <>
      <section className="py-8  mt-8 px-[2px] sm:py-12 lg:px-16 bg-gray-100 text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold ">Guests Favorite Rooms</h2>
            <p className="font-serif text-sm text-gray-600">
              choose your rooms usu at, duo te agam soluta mucius.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {hotelData.map((item) => (
              <RoomsCard item={item} key={item._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;
