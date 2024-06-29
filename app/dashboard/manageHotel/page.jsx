"use client";
import { hotelApiUrl } from "@/app/api/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ManageHotel = () => {
  const [hotels, sethotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currenthotel, setCurrenthotel] = useState(null);

  useEffect(() => {
    fetch("https://server-snowy-one.vercel.app/hotels")
      .then((res) => res.json())
      .then((data) => sethotels(data));
  }, []);
  console.log(hotels);

  const handleDelete = (_id) => {
    fetch(`https://server-snowy-one.vercel.app/hotels/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          sethotels(hotels.filter((hotel) => hotel._id !== _id));
          alert("deleted");
        }
      });
  };

  const handleEdit = (hotel) => {
    setCurrenthotel(hotel);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedHotel) => {
    fetch(`https://server-snowy-one.vercel.app/hotels/${updatedHotel._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHotel),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          sethotels(
            hotels.map((hotel) =>
              hotel._id === updatedHotel._id ? updatedHotel : hotel
            )
          );
          setIsModalOpen(false);
          alert("updated");
        }
      });
  };

  return (
    <div className="px-8 py-8 w-full max-w-screen-lg mx-auto">
      <div>
        {hotels.length === 0 ? (
          <Link className="text-lg text-blue-500" href={"/dashboard/addhotels"}>
            Add the hotels...
          </Link>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(({ _id, name, image, price }, index) => (
                  <tr key={_id} className="border-b">
                    <th className="px-4 py-2">{index + 1}</th>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="hotel Image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{name}</div>
                          <div className="text-sm opacity-50">${price}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className="badge badge-ghost badge-sm">
                        {/* {category} */}
                        others
                      </span>
                    </td>
                    <td className="px-4 py-2">${price}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() =>
                          handleEdit({
                            _id,
                            name,
                            image,
                            price,
                          })
                        }
                        className="btn btn-outline btn-success"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && currenthotel && (
        <EdithotelModal
          hotel={currenthotel}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const EdithotelModal = ({ hotel, onClose, onUpdate }) => {
  const [updatedHotel, setUpdatedHotel] = useState({ ...hotel });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHotel({ ...updatedHotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedHotel);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Edit hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={updatedHotel.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={updatedHotel.price}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="des"
              value={updatedHotel.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            {/* <input
              type="text"
              name="category"
              value={updatedHotel.category}
              onChange={handleChange}
              className="input input-bordered w-full"
            /> */}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-outline mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageHotel;
