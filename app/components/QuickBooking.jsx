<<<<<<< HEAD
=======
 

>>>>>>> 2c0bfdc1bfc91acd136bbb815644366488f11f7d
const QuickBooking = () => {
  
  return (
<<<<<<< HEAD
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
=======
    <div className="bg-white/60 rounded-sm backdrop-blur-sm mx-20 py-5">
      <div className="select-none px-5">
        <table className="block w-full">
            <tr className="grid grid-cols-6 ">
              {/* input for check in or out */}
            <td className="border-[1px] border-black p-2">
              <input className="bg-transparent" type="date" name="check-in" /></td>
            <td className="border-[1px] border-black p-2">
              <input type="date" className="bg-transparent" name="check-out" />
              </td>
              {/* select option */}
              <td className="border-[1px] border-black w-full p-2">
              <select id="adult" className="bg-transparent">
                <option value="1 Adjust">1 Adult</option>
                <option value="2 Adjust">2 Adult</option>
                <option value="3Adjust">3 Adult</option>
                <option value="saab">4 Adult</option>
              </select>
              </td>
            <td className="border-[1px] border-black p-2">
                 <select className="bg-transparent">
                    <option value="1 Children">1 Children</option>
                    <option value="2 Adjust">2 Children</option>
                    <option value="c">3 Children</option>
                    <option value="Children4">4 Children</option>
                  </select>
              </td>
            <td className="border-[1px] border-black p-2">
                          <select className="bg-transparent">
                    <option value="1 Room">1 Room</option>
                    <option value="2 room">2 Room</option>
                    <option value="3 room">3 Room</option>
                    <option value="Children4">4 Children</option>
                  </select>
              </td>
            <td className="border-[1px] bg-white  border-black p-2">
              <button className="block w-full h-full">check now</button>
              </td>
            </tr>
        </table>
>>>>>>> 2c0bfdc1bfc91acd136bbb815644366488f11f7d
      </div>
    </div>
  );
};

export default QuickBooking;
