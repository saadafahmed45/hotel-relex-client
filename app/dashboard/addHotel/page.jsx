"use client";
import { hotelsData } from "@/app/api/api";
import React, { useState } from "react";

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
    const address = form.address.value;
    const city = form.city.value;
    const country = form.country.value;
    const zip_postal = form.zip_postal.value;
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
      location: {
        address,
        city,
        country,
        zip_postal,
      },
      price: intPrice,
      amenities: selectedAmenities,
    };

    console.log(roomsDetails);

    // data post
    fetch(hotelsData, {
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
        console.log("send", data);
        alert("Added The hotel");
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
          className="container w-full max-w-xl p-8 mx-auto space-y-6   rounded-md shadow bg-gray-50"
        >
          <h2 className="w-full text-3xl font-bold leading-tight">Add hotel</h2>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 ml-1">
              Hotel Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="hotel name"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* Location */}
          <div>
            <label htmlFor="address" className="block mb-1 ml-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="hotel address"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* City */}
          <div>
            <label htmlFor="city" className="block mb-1 ml-1">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="city"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block mb-1 ml-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="country"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* ZIP / Postal */}
          <div>
            <label htmlFor="zip_postal" className="block mb-1 ml-1">
              ZIP / Postal
            </label>
            <input
              type="text"
              name="zip_postal"
              placeholder="ZIP / Postal"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* Image */}
          <div>
            <label htmlFor="image" className="block mb-1 ml-1">
              Image Link
            </label>
            <input
              type="text"
              name="image"
              placeholder="hotel image"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-1 ml-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="price per night"
              required=""
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 ml-1">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              placeholder="description..."
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            ></textarea>
          </div>
          {/* Amenities */}
          <div>
            <h3 className="block mb-1 ml-1">Amenities</h3>
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
              <span className="ml-2">Gym</span>
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
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-600 focus:ring-violet-600 hover:ring-violet-600 text-gray-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddRoom;
