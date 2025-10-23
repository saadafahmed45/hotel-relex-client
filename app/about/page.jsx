import Image from "next/image";
import HotelTeam from "../components/HotelTeam";

const About = () => {
  return (
    <div className="about">
      {/* ===== HERO SECTION ===== */}
      <div className="flex h-[40vh] items-center justify-center bg-about-image bg-cover bg-fixed bg-center lg:h-[70vh]">
        <h1 className="text-4xl font-bold text-white shadow-md drop-shadow-lg md:text-6xl">
          About Us
        </h1>
      </div>

      {/* ===== ABOUT INFO SECTION ===== */}
      <section className="bg-gray-100 py-16 text-gray-800">
        <div className="container mx-auto flex flex-col-reverse items-center gap-10 px-6 lg:flex-row lg:gap-16">
          {/* Left: Info */}
          <div className="flex flex-col space-y-8 rounded-lg bg-violet-600 p-8 text-gray-50 shadow-lg lg:w-1/2">
            {[
              {
                title: "Patara Luxury Hotel",
                desc: "Welcome to the best five-star deluxe hotel in New York. Experience unmatched comfort and luxury designed for your perfect stay.",
              },
              {
                title: "World-Class Services",
                desc: "Enjoy our premium dining, spa treatments, and concierge services tailored to meet your expectations.",
              },
              {
                title: "Unforgettable Experiences",
                desc: "From scenic views to exceptional hospitality — every moment at Patara Luxury Hotel is crafted for your memories.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-7 w-7 flex-shrink-0 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center p-4">
              <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg shadow-md">
                <Image
                  src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Hotel interior"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <HotelTeam />

      {/* ===== BLOG / STORY SECTION ===== */}
      <section className="bg-gray-100 py-16 text-gray-800">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Hotel blog cover"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="mb-3 text-2xl font-semibold text-gray-800 sm:text-3xl">
                The Best Luxury Experience Awaits You
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                By{" "}
                <span className="font-medium text-violet-600">
                  Leroy Jenkins
                </span>
              </p>
              <p className="text-gray-600">
                At Patara Luxury Hotel, every guest enjoys an unforgettable stay
                featuring breathtaking views, modern amenities, and world-class
                service. From our rooftop dining to our spa retreats, we ensure
                each moment becomes a cherished memory.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
