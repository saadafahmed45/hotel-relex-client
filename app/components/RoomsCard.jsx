import Link from "next/link";
import React from "react";

const RoomsCard = ({ item }) => {
  const { hotel_id, name, image, location, price_per_night } = item;

  return (
    <div>
      <article className="flex flex-col dark:bg-gray-50 shadow-lg">
        <Link
          rel="noopener noreferrer"
          href={`/rooms/${hotel_id}`}
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            alt=""
            className="object-cover w-full h-52 dark:bg-gray-500"
            src={image}
          />
        </Link>
        <div className="flex flex-col flex-1 p-6">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Te nulla oportere reprimique his dolorum"
          ></a>
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
          >
            {location.city}
          </a>
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
            {name}
          </h3>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
            <span>June 1, 2020</span>
            <span>${price_per_night}</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default RoomsCard;
