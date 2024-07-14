export const hotelApiUrl = `https://hotel-relex-server-git-main-saadafahmed45s-projects.vercel.app/hotels`;

export async function hotelsData() {
  const res = await fetch(hotelApiUrl, {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}

export async function bookingApi() {
  const res = await fetch("https://hotel-relex-server-git-main-saadafahmed45s-projects.vercel.app/booking", {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}
