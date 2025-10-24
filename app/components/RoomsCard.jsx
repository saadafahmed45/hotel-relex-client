import Image from "next/image";
import Link from "next/link";

const RoomsCard = ({ item }) => {
  // Destructure safely (avoid runtime errors if item is undefined)
  const {
    _id,
    name = "Unknown Room",
    image = "/default-room.jpg",
    price = 0,
    description = "",
  } = item || {};

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative">
        <Image
          width={600}
          height={400}
          alt={name}
          src={image.startsWith("http") ? image : `/rooms/${image}`} // ensures valid URL
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
          unoptimized // use if images come from external URLs not configured in next.config
        />

        {/* Price Tag */}
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-gray-800 shadow">
          ${price}/night
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />

        {/* View Details Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/rooms/${_id}`}
            className="rounded-full bg-violet-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-violet-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600">
          {description?.slice(0, 80) || "No description available."}...
        </p>
      </div>
    </article>
  );
};

export default RoomsCard;
