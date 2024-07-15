 

const QuickBooking = () => {
  
  return (
    <div className="bg-white/60 rounded-sm backdrop-blur-sm mx-20 py-5">
      <div className="select-none px-5">
        <table className="block w-full">
            <tr className="grid grid-cols-6 ">
              {/* input for check in or out */}
            <td className="border-[1px] border-black p-2">
              <input className="bg-transparent w-full"  type="date" name="check-in" /></td>
            <td className="border-[1px] border-black p-2">
              <input type="date" className="bg-transparent w-full" name="check-out" />
              </td>
              {/* select option */}
              <td className="border-[1px] border-black w-full p-2">
              <select id="adult" className="bg-transparent w-full">
                <option className="w-full" value="1 Adjust">1 Adult</option>
                <option className="w-full" value="2 Adjust">2 Adult</option>
                <option className="w-full" value="3Adjust">3 Adult</option>
                <option className="w-full" value="saab">4 Adult</option>
              </select>
              </td>
            <td className="border-[1px] border-black p-2">
                 <select className="bg-transparent w-full">
                    <option value="1 Children">1 Children</option>
                    <option value="2 Adjust">2 Children</option>
                    <option value="c">3 Children</option>
                    <option value="Children4">4 Children</option>
                  </select>
              </td>
            <td className="border-[1px] border-black p-2">
                          <select className="bg-transparent w-full h-full">
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
      </div>
    </div>
  );
};

export default QuickBooking;
