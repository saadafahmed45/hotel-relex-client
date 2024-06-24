const hotelApiUrl = `http://localhost:5000/hotels`;

export async function hotelsData() {
  const res = await fetch(hotelApiUrl, {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}

export async function hotelDetails() {
  const res = await fetch("http://localhost:5000/hotels", {
    next: {
      revalidate: 5,
    },
  });
  return res.json();
}
