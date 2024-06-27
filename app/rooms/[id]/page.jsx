"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const RoomDetails = ({ params }) => {
  const id = params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://hotel-relex-server.onrender.com/hotels/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render.

  // console.log(data);

  //  booking
  const handleBooking = (e) => {
    e.preventDefault();
    const form = event.target;
    // const name = form.name.value;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;
    const bookingData = {
      hotel: data,
      checkIn,
      checkOut,
    };
    console.log(bookingData);

    // data post
    fetch("https://hotel-relex-server.onrender.com/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("booking", data);
        alert("booking The hotel");
        form.reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
  return (
    <div className="px-4 lg:px-24 py-16 space-y-6 ">
      {/* breadcrumb */}

      <nav
        aria-label="breadcrumb"
        className="w-full p-4 bg-white text-gray-800"
      >
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link
              rel="noopener noreferrer"
              href={"/"}
              title="Back to homepage"
              className="hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1 text-gray-600"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-400"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Room Details
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-currenttext-gray-400"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Parent
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-400"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
          </li>
        </ol>
      </nav>
      {/* img  */}

      <div>
        <a
          rel="noopener noreferrer"
          href="#"
          className="block max-w-sm gap-3 mx-auto sm:max-w-full   lg:grid lg:grid-cols-12 dark:bg-gray-50"
        >
          <img
            src={data?.image}
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl ">
              {data?.name}
            </h3>
            <span className="text-xs dark:text-gray-600">
              February 19, 2021
            </span>
            <p>{data?.description}</p>
            {/* list  */}
            <div>
              <h3 className="font-semibold text-lg">Amenities:</h3>
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
                {data?.amenities.map((list) => (
                  <li className="flex items-center space-x-2 " key={list}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current text-violet-600"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>{list}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* list  */}
          </div>
        </a>
      </div>

      {/* date  */}
      <form
        onSubmit={handleBooking}
        className="flex flex-col justify-around  lg:flex lg:flex-row place-items-center w-full"
      >
        <div className="flex justify-between flex-col lg:flex-row  px-2 items-center gap-4 lg:gap-8  ">
          <div>
            <h3>Check In Date</h3>
            <input
              type="date"
              name="checkIn"
              id="checkIn"
              className="px-2 py-2  shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-orange-100 focus:ring-violet-600 ring-violet-600"
            />
          </div>
          change
          <div>
            <h3>Check Out Date </h3>
            <input
              type="date"
              name="checkOut"
              id="checkOut"
              className="px-2 py-2  shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-orange-100 focus:ring-violet-600 ring-violet-600"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-1/3 mt-8 px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-600 focus:ring-violet-600 hover:ring-violet-600 text-gray-50"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default RoomDetails;
