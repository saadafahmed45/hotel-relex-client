const QuickBooking = () => {
  return (
    <div className="">
      <div className="bg-white/50 rounded-sm backdrop-blur-sm mx-20 py-10">
        <div className="select-none grid grid-cols-1 gap-2 lg:grid-cols-6  px-5">
          <div className="">
            <input
              type="text"
              placeholder="Email"
              className="block w-full placeholder-black text-slate-900 p-4 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
            />
          </div>
             <div className="">
            <input
                type="date"
                name="checkIn"
              id="checkIn"
              
              className="block w-full p-4 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
              /></div>
                 <div className="">
            <input
                type="date"
                name="checkOut"
                id="checkOut"
              className="block w-full p-4 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
            />
          </div>
          <div className="">
            {" "}
            <select
              className="block w-full p-4 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
              required
              type="text"
              name="roomsQuantity"
              defaultValue="Room"
            >
              <option selected>1 Room </option>
              <option>2 Rooms </option>
              <option>3 Rooms </option>
              <option>4 Rooms </option>
            </select>
          </div>
          <div className="">
            {" "}
            <select
              className="block w-full p-4 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
              required
              type="text"
              name="adult"
              defaultValue="adult"
            >
              <option selected>1 Adult </option>
              <option>2 Adults </option>
              <option>3 Adults </option>
              <option>4 Adults </option>
            </select>
          </div>
       
       
          <div className="">
            <button
              type="submit"
              className="block w-full p-4 border hover:bg-purple-600 hover:text-white border-gray-600 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 bg-transparent "
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
