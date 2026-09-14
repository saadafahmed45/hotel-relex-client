"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { hotelApiUrl, deleteHotel, updateHotel, seedHotelsApi } from "@/app/api/api";
import Swal from "sweetalert2";
import {
  Plus,
  Trash2,
  Edit3,
  Database,
  RefreshCw,
  ExternalLink,
  Bed,
  Maximize2,
  Users,
  Compass,
  X,
} from "lucide-react";
import CloudinaryUploadDropzone from "@/app/components/CloudinaryUploadDropzone";

const ManageHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currenthotel, setCurrenthotel] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetch(hotelApiUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSeedDatabase = async () => {
    const confirm = await Swal.fire({
      title: "Seed Curated Sanctuaries?",
      text: "This will sync the complete 5 luxury rooms dataset (Deluxe, Premium, Executive, Family, Presidential) into MongoDB.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Seed Database",
      confirmButtonColor: "#1C1917",
      cancelButtonColor: "#78716C",
    });

    if (confirm.isConfirmed) {
      setIsSeeding(true);
      try {
        const res = await seedHotelsApi();
        Swal.fire({
          icon: "success",
          title: "Database Seeded!",
          text: res.message || "Curated rooms have been synchronized to MongoDB.",
          confirmButtonColor: "#1C1917",
        });
        await fetchHotels();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Seeding Error",
          text: err.message || "Failed to seed database.",
        });
      } finally {
        setIsSeeding(false);
      }
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Delete ${name || "Sanctuary"}?`,
      text: "This room will be permanently removed from MongoDB.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteHotel(id);
        setHotels((prev) => prev.filter((h) => h._id !== id && h.slug !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Sanctuary removed successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Deletion Failed",
          text: err.message,
        });
      }
    }
  };

  const handleEdit = (hotel) => {
    setCurrenthotel(hotel);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedHotel) => {
    const id = updatedHotel._id || updatedHotel.slug;
    try {
      await updateHotel(id, updatedHotel);
      setHotels((prev) =>
        prev.map((h) =>
          (h._id && h._id === id) || (h.slug && h.slug === id)
            ? { ...h, ...updatedHotel }
            : h
        )
      );
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Sanctuary details updated in MongoDB.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase block">
              HOTEL RELEX SANCTUARY DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal mt-1">
              Manage Sanctuaries
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Live inventory synced with MongoDB. Total sanctuaries: {hotels.length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-black text-amber-100 text-xs tracking-wider uppercase font-medium rounded-sm transition shadow-sm disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSeeding ? "Seeding..." : "Seed Luxury Data"}</span>
            </button>

            <button
              onClick={fetchHotels}
              className="inline-flex items-center gap-2 px-3 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs tracking-wider uppercase font-medium rounded-sm transition"
              title="Refresh inventory"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/dashboard/addHotel"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-wider uppercase font-semibold rounded-sm transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Sanctuary</span>
            </Link>
          </div>
        </div>

        {/* Table / Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-sm border border-stone-200">
            <div className="w-8 h-8 border-2 border-stone-900 border-t-amber-600 rounded-full animate-spin mx-auto" />
            <p className="text-sm font-serif text-stone-600">Retrieving sanctuaries from database...</p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white rounded-sm border border-stone-200 p-8">
            <h3 className="text-xl font-serif text-stone-900">No Sanctuaries in Database</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your MongoDB collection is currently empty. You can either seed the curated luxury dataset or add a custom sanctuary.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleSeedDatabase}
                className="px-5 py-2.5 bg-stone-900 text-amber-100 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-black transition"
              >
                Seed Sample Data to MongoDB
              </button>
              <Link
                href="/dashboard/addHotel"
                className="px-5 py-2.5 bg-stone-200 text-stone-800 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-stone-300 transition"
              >
                Create Room
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-100 border-b border-stone-200 text-[11px] uppercase tracking-wider text-stone-600 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">Sanctuary</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Specifications</th>
                    <th className="py-3.5 px-4">Price / Night</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {hotels.map((hotel, index) => {
                    const identifier = hotel._id || hotel.slug;
                    return (
                      <tr key={identifier || index} className="hover:bg-stone-50 transition">
                        <td className="py-4 px-4 text-center text-xs text-stone-400 font-mono">
                          {index + 1}
                        </td>

                        {/* Room Info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-stone-200 flex-shrink-0 border border-stone-200">
                              {hotel.image ? (
                                <img
                                  src={hotel.image}
                                  alt={hotel.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                                  No Img
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-serif font-semibold text-stone-900 truncate">
                                {hotel.name}
                              </p>
                              <p className="text-xs text-stone-500 truncate max-w-xs font-light">
                                {hotel.shortDescription || hotel.description?.slice(0, 80)}
                              </p>
                              {hotel.slug && (
                                <span className="text-[10px] text-stone-400 font-mono">
                                  slug: {hotel.slug}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                            {hotel.category || "Rooms"}
                          </span>
                        </td>

                        {/* Specs */}
                        <td className="py-4 px-4">
                          <div className="text-xs text-stone-600 space-y-0.5">
                            <div>{hotel.size || "45 m²"}</div>
                            <div className="text-stone-400">{hotel.bed || "King Bed"}</div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 font-serif font-bold text-stone-900">
                          ${hotel.price}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/rooms/${hotel.slug || hotel._id}`}
                              target="_blank"
                              className="p-2 text-stone-500 hover:text-stone-900 transition"
                              title="View Public Dossier"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => handleEdit(hotel)}
                              className="p-2 text-stone-600 hover:text-stone-900 transition"
                              title="Edit Sanctuary"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(identifier, hotel.name)}
                              className="p-2 text-red-500 hover:text-red-700 transition"
                              title="Delete from Database"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
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
  const [formData, setFormData] = useState({
    ...hotel,
    gallery: Array.isArray(hotel.gallery) ? hotel.gallery : (hotel.image ? [hotel.image] : []),
    amenitiesText: Array.isArray(hotel.amenities) ? hotel.amenities.join(", ") : "",
    highlightsText: Array.isArray(hotel.highlights) ? hotel.highlights.join("\n") : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gallery =
      Array.isArray(formData.gallery) && formData.gallery.length > 0
        ? formData.gallery
        : [formData.image];

    const amenities = formData.amenitiesText
      ? formData.amenitiesText
          .split(/[\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const highlights = formData.highlightsText
      ? formData.highlightsText
          .split(/[\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    onUpdate({
      ...formData,
      price: parseInt(formData.price, 10),
      gallery,
      amenities,
      highlights,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-sm border border-stone-300 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <h2 className="text-xl font-serif text-stone-900 font-semibold">
            Edit Sanctuary: {hotel.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category || "Rooms"}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              >
                <option value="Rooms">Rooms</option>
                <option value="Suites">Suites</option>
                <option value="Signature">Signature</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Price / Night ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={formData.size || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Bed
              </label>
              <input
                type="text"
                name="bed"
                value={formData.bed || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Guests
              </label>
              <input
                type="text"
                name="guests"
                value={formData.guests || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
              />
            </div>
          </div>

          {/* Cloudinary Image Uploaders */}
          <CloudinaryUploadDropzone
            label="Primary Sanctuary Image (Cloudinary Hosted) *"
            value={formData.image || ""}
            onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            multiple={false}
            helperText="Upload new photo to host on Cloudinary."
          />

          <CloudinaryUploadDropzone
            label="Lightbox Gallery Photos (Cloudinary Hosted)"
            value={formData.gallery || []}
            onChange={(urls) => setFormData((prev) => ({ ...prev, gallery: urls }))}
            multiple={true}
            helperText="Upload or manage gallery photos from your device."
          />

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
              Description
            </label>
            <textarea
              rows={3}
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-700">
              Amenities (comma separated)
            </label>
            <input
              type="text"
              name="amenitiesText"
              value={formData.amenitiesText || ""}
              onChange={handleChange}
              placeholder="Egyptian cotton, Rain shower, Wi-Fi"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-sm uppercase tracking-wider text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-stone-900 hover:bg-black text-white rounded-sm uppercase tracking-wider text-xs font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageHotel;
