"use client";
import React from "react";

const AddRoom = () => {
  // state
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
    const intPrice = parseInt(price); // Corrected parsing
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
    }; // Changed intPrice to price
    console.log(roomsDetails);

    // data post
    fetch("http://localhost:5000/hotels", {
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
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div>
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleProductAdded}
          noValidate=""
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50"
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
          {/* location  */}
          <div>
            <label htmlFor="name" className="block mb-1 ml-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="hotel address"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* city */}
          <div>
            <label htmlFor="zip" className="text-sm">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder=" city"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* country */}
          <div>
            <label htmlFor="zip" className="text-sm">
              Country
            </label>
            <input
              type="text"
              name="country"
              placeholder="country"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
          {/* zip */}
          <div>
            <label htmlFor="zip" className="text-sm">
              ZIP / Postal
            </label>
            <input
              type="text"
              name="zip_postal"
              placeholder=" ZIP / Postal"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>

          {/* image */}
          <div>
            <label htmlFor="link" className="block mb-1 ml-1">
              image link
            </label>
            <input
              type="text"
              name="image"
              placeholder="hotel image"
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 ml-1">
              price
            </label>
            <input
              name="price"
              type="number"
              placeholder="price per night "
              required=""
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-gray-100"
            />
          </div>
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
