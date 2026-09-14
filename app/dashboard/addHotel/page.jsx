"use client";

import React, { useState } from "react";
import { addHotel } from "@/app/api/api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { PlusCircle, Sparkles, Image as ImageIcon, Bed, Maximize2, Users, Compass, X } from "lucide-react";
import CloudinaryUploadDropzone from "@/app/components/CloudinaryUploadDropzone";

const AddRoom = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Rooms",
    tagline: "",
    price: "",
    size: "45 m² / 485 sq ft",
    guests: "2 Adults",
    bed: "King Bed",
    view: "Private Garden & Ocean Horizon",
    image: "",
    gallery: [],
    shortDescription: "",
    description: "",
    highlightsText: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenity, setCustomAmenity] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomAmenity = (e) => {
    if (e) e.preventDefault();
    const val = customAmenity.trim();
    if (val && !selectedAmenities.includes(val)) {
      setSelectedAmenities([...selectedAmenities, val]);
      setCustomAmenity("");
    }
  };

  const removeAmenity = (amenityToRemove) => {
    setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityToRemove));
  };

  const handleFillSample = () => {
    setSelectedAmenities([
      "Plush King-size bed with Egyptian cotton",
      "Walk-in Italian rain shower",
      "Complimentary high-speed fiber Wi-Fi",
      "65-inch OLED 4K Smart TV",
    ]);
    setFormData({
      name: "Grand Horizon Penthouse",
      category: "Signature",
      tagline: "Unrivaled oceanfront elevation with private wellness deck.",
      price: "1250",
      size: "160 m² / 1,720 sq ft",
      guests: "3 Adults",
      bed: "Emperor King Bed",
      view: "Unobstructed 360° Azure Ocean & Mountain Range",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
      ],
      shortDescription:
        "Perched atop the sanctuary, featuring an open-concept salon, Finnish cedar sauna, and private heated plunge pool overlooking the coastline.",
      description:
        "A pinnacle expression of modernist hospitality, the Grand Horizon Penthouse embodies tranquil grandeur. Designed with bookmatched travertine, fluted oak joinery, and continuous floor-to-ceiling glass that reveals ever-changing coastal tides. Guests enjoy 24/7 dedicated butler service, a private cocktail preparation atelier, and bespoke wellness treatments.",
      highlightsText:
        "Private heated rooftop plunge pool\nDedicated 24/7 butler\nPrivate cedar sauna\nDaily gourmet champagne breakfast",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Please provide a Room Name, Price, and upload a Main Image.",
      });
      return;
    }

    setIsSubmitting(true);

    const gallery =
      Array.isArray(formData.gallery) && formData.gallery.length > 0
        ? formData.gallery
        : [formData.image];

    const highlights = formData.highlightsText
      ? formData.highlightsText
          .split(/[\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const roomPayload = {
      name: formData.name.trim(),
      category: formData.category,
      tagline: formData.tagline.trim(),
      price: parseInt(formData.price, 10),
      size: formData.size.trim(),
      guests: formData.guests.trim(),
      bed: formData.bed.trim(),
      view: formData.view.trim(),
      image: formData.image.trim(),
      gallery,
      shortDescription:
        formData.shortDescription.trim() ||
        formData.description.trim().slice(0, 140) + "...",
      description: formData.description.trim(),
      amenities: selectedAmenities,
      highlights,
    };

    try {
      await addHotel(roomPayload);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sanctuary Published!",
        text: `${formData.name} is now live in the database and hotel catalog.`,
        showConfirmButton: true,
        confirmButtonColor: "#1C1917",
      }).then(() => {
        router.push("/dashboard/manageHotel");
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to connect to the backend server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase block">
              HOTEL RELEX CMS
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal mt-1">
              Add Luxury Sanctuary
            </h1>
            <p className="text-stone-600 text-sm mt-1">
              Publish new rooms, suites, or signature residences directly to the live database.
            </p>
          </div>

          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs tracking-wider uppercase font-medium rounded-sm transition self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8 bg-white p-6 sm:p-10 rounded-sm border border-stone-200 shadow-sm">
          {/* Section 1: Core Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
              <span>01. Core Identity & Pricing</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                  Sanctuary Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Royal Oceanfront Suite"
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                >
                  <option value="Rooms">Rooms</option>
                  <option value="Suites">Suites</option>
                  <option value="Signature">Signature</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                  Poetic Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="e.g. Designed for quiet serenity and uninterrupted horizons."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                  Price / Night (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm text-stone-500 font-serif">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="450"
                    required
                    min="1"
                    className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Architectural Dimensions & Specifications */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
              <span>02. Room Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Size</span>
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 58 m² / 624 sq ft"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>Guests</span>
                </label>
                <input
                  type="text"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 2 Adults, 1 Child"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-amber-700" />
                  <span>Bed Type</span>
                </label>
                <input
                  type="text"
                  name="bed"
                  value={formData.bed}
                  onChange={handleChange}
                  placeholder="e.g. California King Bed"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>View</span>
                </label>
                <input
                  type="text"
                  name="view"
                  value={formData.view}
                  onChange={handleChange}
                  placeholder="e.g. Panoramic Ocean Horizon"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Imagery Hosted by Cloudinary */}
          <div className="space-y-6 pt-4">
            <h2 className="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
              <ImageIcon className="w-5 h-5 text-amber-700" />
              <span>03. Photography & Media (Cloudinary Hosted)</span>
            </h2>

            {/* Primary Showcase Image */}
            <CloudinaryUploadDropzone
              label="Primary Showcase Image (Cloudinary Hosted) *"
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              multiple={false}
              helperText="Upload main luxury sanctuary photo from your computer. It will be hosted on Cloudinary."
            />

            {/* Additional Gallery Photos */}
            <CloudinaryUploadDropzone
              label="Additional Lightbox Gallery (Cloudinary Hosted)"
              value={formData.gallery}
              onChange={(urls) => setFormData((prev) => ({ ...prev, gallery: urls }))}
              multiple={true}
              helperText="Select one or multiple images from your computer to upload as gallery views."
            />
          </div>

          {/* Section 4: Architectural Narratives */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-serif font-semibold text-stone-900 pb-2 border-b border-stone-100">
              04. Editorial Descriptions
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Short Preview Description (1-2 sentences)
              </label>
              <textarea
                rows={2}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="A concise synopsis shown on catalog preview cards."
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Full Architectural Dossier & Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deep architectural and hospitality description shown on the sanctuary details dossier."
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
              />
            </div>
          </div>

          {/* Section 5: Curated Amenities & Highlights (Custom Add Only) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h2 className="text-lg font-serif font-semibold text-stone-900">
                05. Curated Amenities & Highlights
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {selectedAmenities.length} {selectedAmenities.length === 1 ? "Amenity" : "Amenities"} Added
              </span>
            </div>

            {/* Custom amenity input */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Add Custom Amenity
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomAmenity();
                    }
                  }}
                  placeholder="Type custom amenity (e.g. Private Wine Cellar, Italian Rain Shower)..."
                  className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
                />
                <button
                  type="button"
                  onClick={addCustomAmenity}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-medium rounded-sm uppercase tracking-wider transition flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-400">
                Press Enter or click Add to include any custom amenity.
              </p>
            </div>

            {/* Active Amenities Chips */}
            {selectedAmenities.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedAmenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50/80 border border-amber-300 text-stone-900 text-xs rounded-sm font-medium transition hover:border-amber-400"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="text-amber-800 hover:text-red-600 transition p-0.5 rounded-full"
                      title="Remove amenity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-stone-50 border border-dashed border-stone-200 rounded-sm text-center text-xs text-stone-500">
                No amenities added yet. Type your custom amenity above and click Add.
              </div>
            )}

            {/* Highlights */}
            <div className="space-y-1.5 pt-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Key Highlights (one per line, e.g. Soundproof panoramic windows)
              </label>
              <textarea
                rows={3}
                name="highlightsText"
                value={formData.highlightsText}
                onChange={handleChange}
                placeholder="Deep soaking marble tub&#10;Private terrace sunrise view&#10;Bang &amp; Olufsen acoustics"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              All published sanctuaries automatically update the dynamic catalog and home showcases.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-black text-amber-100 uppercase tracking-[0.2em] text-xs font-semibold rounded-sm transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? "Publishing to Database..." : "Publish Sanctuary"}</span>
            </button>
          </div>
        </form>
    </div>
  );
};

export default AddRoom;
