import React from "react";

const RoomDetails = ({ params }) => {
  const id = params.id;
  return (
    <div className="h-screen px-24">
      <h2>id: {id}</h2>
    </div>
  );
};

export default RoomDetails;
