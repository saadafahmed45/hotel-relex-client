/**
 * Client-side Cloudinary Upload Utility
 * Prioritizes server-side signed uploads via API Key and Secret (/api/upload).
 */

export function getCloudinaryConfig() {
  let localCloudName = "";
  let localPreset = "";
  if (typeof window !== "undefined") {
    localCloudName = localStorage.getItem("hotel_relex_cloudinary_cloud_name") || "";
    localPreset = localStorage.getItem("hotel_relex_cloudinary_preset") || "";
  }
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || localCloudName || "",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || localPreset || "",
  };
}

export function saveCloudinaryConfig(cloudName, uploadPreset) {
  if (typeof window !== "undefined") {
    localStorage.setItem("hotel_relex_cloudinary_cloud_name", (cloudName || "").trim());
    localStorage.setItem("hotel_relex_cloudinary_preset", (uploadPreset || "").trim());
  }
}

export async function uploadImageToCloudinary(file) {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const formData = new FormData();
  formData.append("file", file);

  // Call the server-side signed upload endpoint
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || `Upload failed with status ${response.status}`
    );
  }

  return {
    url: data.url,
    publicId: data.publicId,
  };
}
