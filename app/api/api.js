export const hotelApiUrl = `https://server-snowy-one.vercel.app/hotels`;

export async function hotelsData() {
  const res = await fetch(hotelApiUrl, {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}

export async function bookingApi() {
  const res = await fetch("https://server-snowy-one.vercel.app/booking", {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}
