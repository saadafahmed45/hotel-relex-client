"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export default function CloudinaryUploadDropzone({
  label = "Upload Image",
  value = "", // string if multiple=false, array of strings if multiple=true
  onChange,
  multiple = false,
  helperText = "Select or drag high-resolution imagery (JPG, PNG, WEBP).",
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setErrorMessage("");

    try {
      if (multiple) {
        setUploadProgress(`Uploading 1 of ${files.length} photos...`);
        const uploadedUrls = [];

        for (let i = 0; i < files.length; i++) {
          setUploadProgress(`Uploading photo ${i + 1} of ${files.length}...`);
          const result = await uploadImageToCloudinary(files[i]);
          uploadedUrls.push(result.url);
        }

        const existing = Array.isArray(value) ? value : [];
        onChange([...existing, ...uploadedUrls]);
      } else {
        setUploadProgress("Uploading to Cloudinary CDN...");
        const result = await uploadImageToCloudinary(files[0]);
        onChange(result.url);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setErrorMessage(
        err.message ||
          "Upload failed. Ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in client/.env.local."
      );
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveSingle = () => {
    onChange("");
  };

  const handleRemoveFromGallery = (indexToRemove) => {
    if (Array.isArray(value)) {
      onChange(value.filter((_, idx) => idx !== indexToRemove));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
          {label}
        </label>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Cloudinary Signed Upload</span>
        </div>
      </div>

      {/* Upload Error Alert */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-800 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Single Image Display or Dropzone */}
      {!multiple && (
        <>
          {value ? (
            <div className="relative rounded-sm border border-stone-200 overflow-hidden bg-stone-100 group">
              <div className="aspect-[16/9] w-full relative">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3.5 py-2 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-sm shadow hover:bg-stone-100 transition flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Replace Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveSingle}
                    className="px-3.5 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow hover:bg-red-700 transition flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              <div className="px-3 py-2 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-600 truncate max-w-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate font-mono text-[11px]">{value}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Cloudinary Hosted
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-sm p-6 sm:p-8 text-center cursor-pointer transition ${
                uploading
                  ? "border-amber-400 bg-amber-50/40"
                  : "border-stone-300 hover:border-stone-500 bg-stone-50 hover:bg-stone-100/60"
              }`}
            >
              {uploading ? (
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 text-amber-700 animate-spin" />
                  <span className="text-xs font-serif text-stone-800 font-medium">
                    {uploadProgress || "Uploading image to Cloudinary..."}
                  </span>
                </div>
              ) : (
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-600">
                    <UploadCloud className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                      Click to choose image or drag and drop
                    </p>
                    <p className="text-[11px] text-stone-500">{helperText}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Multiple Gallery Upload & Preview Grid */}
      {multiple && (
        <div className="space-y-3">
          {Array.isArray(value) && value.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {value.map((url, index) => (
                <div
                  key={url + index}
                  className="relative aspect-video rounded-sm overflow-hidden border border-stone-200 bg-stone-100 group"
                >
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveFromGallery(index)}
                      className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-sm transition"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-sm p-4 sm:p-5 text-center cursor-pointer transition ${
              uploading
                ? "border-amber-400 bg-amber-50/40"
                : "border-stone-300 hover:border-stone-500 bg-stone-50 hover:bg-stone-100/60"
            }`}
          >
            {uploading ? (
              <div className="space-y-1 flex flex-col items-center justify-center py-2">
                <Loader2 className="w-6 h-6 text-amber-700 animate-spin" />
                <span className="text-xs font-serif text-stone-800 font-medium">
                  {uploadProgress || "Uploading gallery photos to Cloudinary..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                <Plus className="w-4 h-4 text-amber-700" />
                <span>Add Gallery Photos from Computer</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual URL Toggle */}
      <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="hover:text-stone-800 underline transition"
        >
          {showManualInput ? "Hide manual URL input" : "Or enter URL manually"}
        </button>
      </div>

      {showManualInput && (
        <input
          type="text"
          value={typeof value === "string" ? value : value?.join(", ") || ""}
          onChange={(e) => {
            if (multiple) {
              onChange(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              );
            } else {
              onChange(e.target.value);
            }
          }}
          placeholder={
            multiple
              ? "https://res.cloudinary.com/..., https://..."
              : "https://res.cloudinary.com/..."
          }
          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-sm text-xs font-mono focus:outline-none focus:border-stone-900"
        />
      )}
    </div>
  );
}
