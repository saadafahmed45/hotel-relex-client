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
    <div>
      <section className="py-6 px-8 sm:py-12 lg:px-16 dark:bg-gray-100 dark:text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Relax in our Hotel Resort</h2>
            <p className="font-serif text-sm dark:text-gray-600">
              Qualisque erroribus usu at, duo te agam soluta mucius.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {hotelData.map((item) => (
              <RoomsCard item={item} key={item._id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
