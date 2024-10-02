"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import Image from "next/image";
const RoomDetails = ({ params }) => {
  const id = params.id;
  const [data, setData] = useState(null);
  const [bookData, setBookData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // set current date
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://hotel-relex-server.onrender.com/hotels/${id}`,
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
  }, [id]); // Empty dependency array ensures this effect runs only once after the initial render.

  // console.log(data);

  //  booking
  const handleBooking = (e) => {
    e.preventDefault();
    const form = event.target;
    const checkIn = new Date(form.checkIn.value);
    const checkOut = new Date(form.checkOut.value);
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const roomsQuantity = form.roomsQuantity.value;
    const adult = form.adult.value;
    const childen = form.childen.value;

    // Calculate the number of days
    const timeDiff = checkOut - checkIn;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Assuming a fixed price per day (e.g., $100 per day)
    const pricePerDay = data.price;
    const totalPrice = daysDiff * pricePerDay;

    const bookingData = {
      // checkOut: form.checkOut.value,
      customersDetails: {
        firstname,
        lastname,
        email,
        phoneNumber,
        bookingDetails: {
          hotel: data,
          checkIn: form.checkIn.value,
          checkOut: form.checkOut.value,
          roomsQuantity,
          adult,
          childen,
          totalPrice,
        },
      },
    };
    setBookData(bookingData);
    console.log(bookingData);
    console.log("pdf", bookData);
    // console.log("set", bookData);

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
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Room the Booking!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  // pdf
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text(`Hotel: ${bookData.hotel.name}`, 10, 10);
    doc.text(`Check In Date: ${bookData.checkIn}`, 10, 20);
    doc.text(`Check Out Date: ${bookData.checkOut}`, 10, 30);
    doc.text(`Total Price: $${bookData.totalPrice}`, 10, 40);

    doc.save("booking-details.pdf");
  };
  return (
    <div className="space-y-2 px-4 py-16 lg:px-24">
      {/* breadcrumb */}
      {/* <button
        onClick={generatePDF}
        className="mt-8 w-1/3 rounded bg-violet-600 px-4 py-2 font-bold text-gray-50 shadow hover:ring hover:ring-violet-600 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
      >
        Generate PDF
      </button> */}
      <nav
        aria-label="breadcrumb"
        className="w-full bg-white p-4 text-gray-800"
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
                className="h-5 w-5 pr-1 text-gray-600"
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
              className="mt-1 h-2 w-2 rotate-90 transform fill-current text-gray-400"
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
              className="fill-currenttext-gray-400 mt-1 h-2 w-2 rotate-90 transform"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Bookings
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="mt-1 h-2 w-2 rotate-90 transform fill-current text-gray-400"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
          </li>
        </ol>
      </nav>
      {/* img  */}

      <div>
        {loading === true ? (
          <div
            role="status"
            className="flex place-content-center place-items-center content-center items-center"
          >
            <svg
              aria-hidden="true"
              class="h-8 w-8 animate-spin fill-blue-600 text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <a
            rel="noopener noreferrer"
            href="#"
            className="mx-auto block max-w-sm gap-3 bg-gray-50 sm:max-w-full lg:grid lg:grid-cols-12"
          >
            <img
              // width={100}
              // height={100}
              src={data?.image}
              alt=""
              className="h-64 w-full rounded bg-gray-500 object-cover sm:h-96 lg:col-span-7"
            />
            <div className="space-y-2 p-6 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl">
                {data?.name}
              </h3>
              <span className="text-xs text-gray-600">February 19, 2021</span>
              <p>{data?.description}</p>
              {/* list  */}
              <div>
                <h3 className="text-lg font-semibold">Amenities:</h3>
                <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
                  {data?.amenities.map((list) => (
                    <li className="flex items-center space-x-2" key={list}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-5 w-5 fill-current text-violet-600"
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
              <h2 className="mt-4 pt-4 text-2xl">${data?.price} per Night</h2>
            </div>
          </a>
        )}
      </div>

      {/* booking  */}

      {/* date  */}
      <div>
        <form
          onSubmit={handleBooking}
          className="flex w-full flex-col justify-around space-y-4 bg-gray-300 p-8 lg:flex lg:flex-col"
        >
          <div className="flex flex-col items-center justify-between gap-4 px-2 lg:flex-row lg:gap-8">
            <div>
              <h3>Check In Date</h3>
              <input
                type="date"
                name="checkIn"
                defaultValue={currentDate}
                id="checkIn"
                className="rounded bg-gray-100 px-2 py-2 shadow ring-violet-600 hover:ring focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
              />
            </div>
            <h2 className="text-lg font-bold"> To</h2>
            <div>
              <h3>Check Out Date </h3>
              <input
                type="date"
                name="checkOut"
                id="checkOut"
                className="rounded bg-gray-100 px-2 py-2 shadow ring-violet-600 hover:ring focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
              />
            </div>
          </div>
          {/* form */}
          <div>
            <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="First name"
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Phone Number
                </label>
                <input
                  id="number"
                  type="number"
                  name="phoneNumber"
                  placeholder="phone number"
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  Rooms
                </label>
                <select
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                  required
                  name="roomsQuantity"
                  defaultValue="1"
                >
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                </select>
              </div>

              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  Adult
                </label>
                <select
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                  required
                  type="text"
                  name="adult"
                >
                  <option selected>1 Adult </option>
                  <option>2 Adults </option>
                  <option>3 Adults </option>
                  <option>4 Adults </option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="city" className="text-sm">
                  Childen
                </label>

                <select
                  className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
                  required
                  type="text"
                  name="childen"
                >
                  <option selected disabled>
                    {" "}
                    Childen{" "}
                  </option>
                  <option>1 Child </option>
                  <option>2 Childen </option>
                  <option>3 Childen </option>
                  <option>4 Childen </option>
                </select>
              </div>
            </div>
          </div>

          <div className="item-center flex justify-center">
            <button
              type="submit"
              className="mt-8 w-1/3 rounded bg-violet-600 px-4 py-2 font-bold text-gray-50 shadow hover:ring hover:ring-violet-600 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomDetails;
