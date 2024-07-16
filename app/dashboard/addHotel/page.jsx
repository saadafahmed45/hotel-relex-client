"use client";
import { hotelsData } from "@/app/api/api";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddRoom = () => {
  const [amenities, setAmenities] = useState({
    freeWiFi: false,
    rooftopBar: false,
    conferenceRooms: false,
    gym: false,
    swimmingPool: false,
    seaView: false,
  });

  //

  const handleProductAdded = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const image = form.image.value;

    const price = form.price.value;
    const intPrice = parseInt(price);

    const selectedAmenities = [];
    for (const [key, value] of Object.entries(amenities)) {
      if (value) {
        selectedAmenities.push(key.replace(/([A-Z])/g, " $1").trim());
      }
    }

    const roomsDetails = {
      name,
      description,
      image,

      price: intPrice,
      amenities: selectedAmenities,
    };

    console.log(roomsDetails);

    // data post
    fetch("https://hotel-relex-server.onrender.com/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomsDetails),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("send", data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Room has been Added",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleProductAdded}
          noValidate=""
          className="container mx-auto w-full max-w-xl space-y-6 rounded-md bg-gray-50 p-8 shadow"
        >
          <h2 className="w-full text-3xl font-bold leading-tight">Add hotel</h2>
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1 ml-1 block">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="hotel name"
              className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="mb-1 ml-1 block">
              Room Image Link
            </label>
            <input
              type="text"
              name="image"
              placeholder="hotel image"
              className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="mb-1 ml-1 block">
              Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="price per night"
              required=""
              className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
            />
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-1 ml-1 block">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              placeholder="description..."
              className="autoexpand block h-36 w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
            ></textarea>
          </div>
          {/* Amenities */}
          <div className="space-x-2 space-y-2">
            <h3 className="mb-1 ml-1 block">ROOM FACILITIES</h3>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="freeWiFi"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Free Wi-Fi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="rooftopBar"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Rooftop Bar</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="conferenceRooms"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Conference Rooms</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="gym"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Free Gym</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="swimmingPool"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2"> Swimming Pool</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="seaView"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Sea view</span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded bg-violet-600 px-4 py-2 font-bold text-gray-50 shadow hover:ring hover:ring-violet-600 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
            >
              Book
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddRoom;
