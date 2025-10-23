// import React from "react";

// const CheckOutPage = () => {

//   //  booking
//   const handleBooking = (e) => {
//     e.preventDefault();
//     const form = event.target;
//     const checkIn = new Date(form.checkIn.value);
//     const checkOut = new Date(form.checkOut.value);
//     const firstname = form.firstname.value;
//     const lastname = form.lastname.value;
//     const email = form.email.value;
//     const phoneNumber = form.phoneNumber.value;
//     const roomsQuantity = form.roomsQuantity.value;
//     const adult = form.adult.value;
//     const childen = form.childen.value;

//     // Calculate the number of days
//     const timeDiff = checkOut - checkIn;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     // Assuming a fixed price per day (e.g., $100 per day)
//     const pricePerDay = data.price;
//     const totalPrice = daysDiff * pricePerDay;

//     const bookingData = {
//       // checkOut: form.checkOut.value,
//       customersDetails: {
//         firstname,
//         lastname,
//         email,
//         phoneNumber,
//         bookingDetails: {
//           hotel: data,
//           checkIn: form.checkIn.value,
//           checkOut: form.checkOut.value,
//           roomsQuantity,
//           adult,
//           childen,
//           totalPrice,
//         },
//       },
//     };
//     setBookData(bookingData);
//     console.log(bookingData);
//     console.log("pdf", bookData);
//     // console.log("set", bookData);

//   return (
//     <div>
//       {/* date  */}
//       <div>
//         <form
//           onSubmit={handleBooking}
//           className="flex w-full flex-col justify-around space-y-4 bg-gray-300 p-8 lg:flex lg:flex-col"
//         >
//           <div className="flex flex-col items-center justify-between gap-4 px-2 lg:flex-row lg:gap-8">
//             <div>
//               <h3>Check In Date</h3>
//               <input
//                 type="date"
//                 name="checkIn"
//                 defaultValue={currentDate}
//                 id="checkIn"
//                 className="rounded bg-gray-100 px-2 py-2 shadow ring-violet-600 hover:ring focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
//               />
//             </div>
//             <h2 className="text-lg font-bold"> To</h2>
//             <div>
//               <h3>Check Out Date </h3>
//               <input
//                 type="date"
//                 name="checkOut"
//                 id="checkOut"
//                 className="rounded bg-gray-100 px-2 py-2 shadow ring-violet-600 hover:ring focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
//               />
//             </div>
//           </div>
//           {/* form */}
//           <div>
//             <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
//               <div className="col-span-full sm:col-span-3">
//                 <label htmlFor="firstname" className="text-sm">
//                   First name
//                 </label>
//                 <input
//                   id="firstname"
//                   type="text"
//                   placeholder="First name"
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                 />
//               </div>
//               <div className="col-span-full sm:col-span-3">
//                 <label htmlFor="lastname" className="text-sm">
//                   Last name
//                 </label>
//                 <input
//                   id="lastname"
//                   type="text"
//                   placeholder="Last name"
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                 />
//               </div>
//               <div className="col-span-full sm:col-span-3">
//                 <label htmlFor="email" className="text-sm">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Email"
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                 />
//               </div>
//               <div className="col-span-full sm:col-span-3">
//                 <label htmlFor="email" className="text-sm">
//                   Phone Number
//                 </label>
//                 <input
//                   id="number"
//                   type="number"
//                   name="phoneNumber"
//                   placeholder="phone number"
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                 />
//               </div>
//               <div className="col-span-full sm:col-span-2">
//                 <label htmlFor="city" className="text-sm">
//                   Rooms
//                 </label>
//                 <select
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                   required
//                   name="roomsQuantity"
//                   defaultValue="1"
//                 >
//                   <option value="1">1 Room</option>
//                   <option value="2">2 Rooms</option>
//                   <option value="3">3 Rooms</option>
//                   <option value="4">4 Rooms</option>
//                 </select>
//               </div>

//               <div className="col-span-full sm:col-span-2">
//                 <label htmlFor="city" className="text-sm">
//                   Adult
//                 </label>
//                 <select
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                   required
//                   type="text"
//                   name="adult"
//                 >
//                   <option selected>1 Adult </option>
//                   <option>2 Adults </option>
//                   <option>3 Adults </option>
//                   <option>4 Adults </option>
//                 </select>
//               </div>
//               <div className="col-span-full sm:col-span-2">
//                 <label htmlFor="city" className="text-sm">
//                   Childen
//                 </label>

//                 <select
//                   className="block w-full rounded bg-gray-100 p-2 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-25"
//                   required
//                   type="text"
//                   name="childen"
//                 >
//                   <option selected disabled>
//                     {" "}
//                     Childen{" "}
//                   </option>
//                   <option>1 Child </option>
//                   <option>2 Childen </option>
//                   <option>3 Childen </option>
//                   <option>4 Childen </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="item-center flex justify-center">
//             <button
//               type="submit"
//               className="mt-8 w-1/3 rounded bg-violet-600 px-4 py-2 font-bold text-gray-50 shadow hover:ring hover:ring-violet-600 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
//             >
//               Book
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckOutPage;
