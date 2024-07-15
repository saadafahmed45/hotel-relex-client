"use client";
const QuickBooking = () => {
  return (
    <div className="bg-white/60 rounded-sm backdrop-blur-sm mx-5 md:mx-20 py-5">
      <div className="select-none px-2 md:px-5">
        <table className="block w-full">
          <tr className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-0">
            {/* input for check in or out */}
            <td className="border-[1px] border-black p-2">
              <input className="bg-transparent w-full" type="date" name="check-in" />
            </td>
            <td className="border-[1px] border-black p-2">
              <input type="date" className="bg-transparent w-full" name="check-out" />
            </td>
            {/* select option */}
            <td className="border-[1px] border-black w-full p-2">
              <select id="adult" className="bg-transparent w-full">
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adult">2 Adult</option>
                <option value="3 Adult">3 Adult</option>
                <option value="4 Adult">4 Adult</option>
              </select>
            </td>
            <td className="border-[1px] border-black p-2">
              <select className="bg-transparent w-full">
                <option value="1 Children">1 Children</option>
                <option value="2 Children">2 Children</option>
                <option value="3 Children">3 Children</option>
                <option value="4 Children">4 Children</option>
              </select>
            </td>
            <td className="border-[1px] border-black p-2">
              <select className="bg-transparent w-full">
                <option value="1 Room">1 Room</option>
                <option value="2 Room">2 Room</option>
                <option value="3 Room">3 Room</option>
                <option value="4 Room">4 Room</option>
              </select>
            </td>
            <td className="border-[1px] bg-white border-black p-2">
              <button className="block w-full h-full">Check Now</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default QuickBooking;