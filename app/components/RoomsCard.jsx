import Link from "next/link";

const RoomsCard = ({ item }) => {
  const { _id, name, image, price, description } = item;

  return (
    <>
      <article className="flex flex-col bg-gray-50 shadow-lg">
        <Link
          rel="noopener noreferrer"
          href={`/rooms/${_id}`}
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <img
            alt=""
            className="object-cover w-full h-52 bg-gray-500"
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
            {/* {location.city} */}
          </a>
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">

            {name}
          </h3>
          <p>
            {" "}
            {description.slice(0, 105)}....{" "}
            <Link className="text-blue-600 text-sm" href={`/rooms/${_id}`}>
              See full
            </Link>{" "}
          </p>
          <div className="flex justify-start gap-8 items-center">
            <div>
              <Link
                className="bg-violet-600 hover:bg-slate-800 text-white text-lg py-3 px-5 "
                href={`/rooms/${_id}`}
              >
                Book
              </Link>
            </div>
            <div>
              <h3 className="text-[22px] text-slate-800"> ${price}</h3>
              <span className="text-[12px]">per night</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default RoomsCard;
