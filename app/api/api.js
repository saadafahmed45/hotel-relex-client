import { LUXURY_ROOMS } from "../../lib/data";

export const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const hotelApiUrl = `${SERVER_BASE_URL}/hotels`;
export const bookingApiUrl = `${SERVER_BASE_URL}/booking`;

/**
 * Fetch all hotels / sanctuaries from the live server.
 * Merges with luxury fallbacks to ensure rich UI consistency.
 */
export async function hotelsData() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(hotelApiUrl, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item, index) => {
        const fallback =
          LUXURY_ROOMS.find((r) => r.slug === item.slug || r._id === item.slug) ||
          LUXURY_ROOMS[index % LUXURY_ROOMS.length];

        return {
          ...fallback,
          ...item,
          image: item.image || fallback.image,
          price: item.price ?? fallback.price,
          name: item.name || fallback.name,
          description: item.description || fallback.description,
          category: item.category || fallback.category || "Rooms",
          gallery:
            item.gallery && item.gallery.length > 0
              ? item.gallery
              : fallback.gallery,
          amenities:
            item.amenities && item.amenities.length > 0
              ? item.amenities
              : fallback.amenities,
          highlights:
            item.highlights && item.highlights.length > 0
              ? item.highlights
              : fallback.highlights,
        };
      });
    }

    return LUXURY_ROOMS;
  } catch (err) {
    console.warn("Using luxury fallback room dataset:", err.message);
    return LUXURY_ROOMS;
  }
}

/**
 * Fetch a single room by ObjectId or slug.
 */
export async function getRoomById(id) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${hotelApiUrl}/${id}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.name) {
        const fallback =
          LUXURY_ROOMS.find((r) => r._id === id || r.slug === id || r.slug === data.slug) ||
          LUXURY_ROOMS[0];

        return {
          ...fallback,
          ...data,
          gallery:
            data.gallery && data.gallery.length > 0
              ? data.gallery
              : fallback.gallery,
          amenities:
            data.amenities && data.amenities.length > 0
              ? data.amenities
              : fallback.amenities,
          highlights:
            data.highlights && data.highlights.length > 0
              ? data.highlights
              : fallback.highlights,
        };
      }
    }
  } catch (err) {
    console.warn(`Fallback for room ${id}:`, err.message);
  }

  // Fallback match from curated data
  return (
    LUXURY_ROOMS.find((r) => r._id === id || r.slug === id) ||
    LUXURY_ROOMS[0]
  );
}

/**
 * Fetch all bookings from the server (for dashboard).
 */
export async function bookingApi() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(bookingApiUrl, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("Bookings fetch error:", err.message);
    return [];
  }
}

/**
 * Submit a new guest booking to the server.
 */
export async function submitBooking(bookingData) {
  try {
    const res = await fetch(bookingApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Server rejected booking");
    return await res.json();
  } catch (err) {
    console.warn("Server booking error (falling back to confirmed local session):", err.message);
    return { acknowledged: true, insertedId: "mock-" + Date.now(), isMock: true };
  }
}

/**
 * Create a new hotel room in the database.
 */
export async function addHotel(hotelData) {
  const res = await fetch(hotelApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotelData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

/**
 * Update an existing hotel room.
 */
export async function updateHotel(id, hotelData) {
  const res = await fetch(`${hotelApiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotelData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

/**
 * Delete a hotel room by ID or slug.
 */
export async function deleteHotel(id) {
  const res = await fetch(`${hotelApiUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

/**
 * Delete a booking by ID.
 */
export async function deleteBooking(id) {
  const res = await fetch(`${bookingApiUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

/**
 * Seed local luxury data to MongoDB.
 */
export async function seedHotelsApi() {
  const res = await fetch(`${SERVER_BASE_URL}/seed-hotels`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

/**
 * Check reservation status by guest email and/or phone number.
 */
export async function checkBookingStatus({ email = "", phone = "" }) {
  const cleanEmail = email.trim();
  const cleanPhone = phone.trim();

  if (!cleanEmail && !cleanPhone) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    if (cleanEmail) params.append("email", cleanEmail);
    if (cleanPhone) params.append("phone", cleanPhone);

    const res = await fetch(`${bookingApiUrl}/check?${params.toString()}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.bookings)) {
        return data.bookings;
      }
    }
  } catch (err) {
    console.warn("Server check endpoint error, trying fallback:", err.message);
  }

  // Resilient fallback: fetch all bookings and filter client-side
  try {
    const all = await bookingApi();
    return all.filter((b) => {
      const bEmail = (b.email || b.customersDetails?.email || "").toLowerCase();
      const bPhone = (b.phoneNumber || b.customersDetails?.phoneNumber || "").replace(/\D/g, "");
      const searchEmail = cleanEmail.toLowerCase();
      const searchPhone = cleanPhone.replace(/\D/g, "");

      const emailMatches = searchEmail && bEmail === searchEmail;
      const phoneMatches = searchPhone && (bPhone.includes(searchPhone) || searchPhone.includes(bPhone));

      return emailMatches || phoneMatches;
    }).map((b) => {
      const firstname = b.firstname || b.customersDetails?.firstname || "";
      const lastname = b.lastname || b.customersDetails?.lastname || "";
      return {
        _id: b._id,
        referenceId: "RELEX-" + String(b._id).slice(-6).toUpperCase(),
        status: b.status || "Confirmed",
        firstname,
        lastname,
        fullName: `${firstname} ${lastname}`.trim() || "Valued Guest",
        email: b.email || b.customersDetails?.email || "",
        phoneNumber: b.phoneNumber || b.customersDetails?.phoneNumber || "",
        hotelName: b.hotelName || b.customersDetails?.bookingDetails?.hotel?.name || "Luxury Sanctuary",
        hotelId: b.hotelId || b.customersDetails?.bookingDetails?.hotel?._id || "",
        checkIn: b.checkIn || b.customersDetails?.bookingDetails?.checkIn || "",
        checkOut: b.checkOut || b.customersDetails?.bookingDetails?.checkOut || "",
        nights: b.nights || 1,
        totalPrice: b.totalPrice || b.customersDetails?.bookingDetails?.totalPrice || 0,
        roomsQuantity: b.roomsQuantity || b.customersDetails?.bookingDetails?.roomsQuantity || "1",
        adult: b.adult || b.customersDetails?.bookingDetails?.adult || "2",
        children: b.children || b.customersDetails?.bookingDetails?.childen || "0",
        specialRequests: b.specialRequests || "",
        createdAt: b.createdAt || new Date().toISOString(),
      };
    });
  } catch (err) {
    console.error("Booking status fallback error:", err);
    return [];
  }
}

/**
 * Update reservation status (Confirmed, Pending, Checked In, Cancelled).
 */
export async function updateBookingStatus(id, status) {
  const res = await fetch(`${bookingApiUrl}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error ${res.status}`);
  }
  return await res.json();
}

