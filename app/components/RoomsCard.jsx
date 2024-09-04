import Image from "next/image";
import Link from "next/link";

const RoomsCard = ({ item }) => {
  const { _id, name, image, price, description } = item;

  return (
    <>
      <article className="flex flex-col rounded-md bg-gray-50 shadow-lg">
        <Link
          rel="noopener noreferrer"
          href={`/rooms/${_id}`}
          aria-label="Te nulla oportere reprimique his dolorum"
        >
          <Image
            width={600}
            height={400}
            alt=""
            className="h-52 w-full bg-gray-500 object-cover"
            src={image}
          />
        </Link>

        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
            {name}
          </h3>
          <p className="text-slate-600">
            {" "}
            {description.slice(0, 70)}...{" "}
            {/* <Link className="text-sm text-blue-600" href={`/rooms/${_id}`}>
              learn more
            </Link>{" "} */}
          </p>
          <div className="flex items-center justify-start gap-8">
            <div>
              <Link
                className="bg-violet-600 px-5 py-3 text-lg text-white hover:bg-slate-800"
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
