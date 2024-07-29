import HotelTeam from "../components/HotelTeam";

const About = () => {
  return (
    <div className="about">
      <div className="flex h-[30vh] items-center justify-center bg-about-image bg-cover bg-fixed bg-center lg:h-[70vh]">
        <h1 className="text-5xl text-white shadow-lg">About Us</h1>
      </div>
      {/* about 2nd  */}
      <section className="bg-gray-100 py-8 text-gray-800">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row">
          <div className="flex flex-col space-y-6 rounded-sm bg-violet-600 px-6 py-8 text-gray-50 sm:p-8 lg:w-1/2 lg:p-12 xl:w-2/5">
            <div className="flex space-x-2 sm:space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">
                  Patara Luxury Hotel
                </p>
                <p className="leading-snug">
                  Welcome to the best five-star deluxe hotel in New York. The in
                  hotel elementum sesue the aucan vestibulum aliquam ustona
                  sapien rutrum volutpat onec in quis the veliten.
                </p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="leading-snug">
                  Praesentium ea et neque distinctio quas eius repudiandae
                  quaerat obcaecati voluptatem similique!
                </p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <div className="space-y-2">
                <p className="text-lg font-medium leading-snug">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="leading-snug">
                  Praesentium ea et neque distinctio quas eius repudiandae
                  quaerat obcaecati voluptatem similique!
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 lg:w-1/2 xl:w-3/5">
            <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
              <img
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
                alt=""
                className="aspect-video rounded-lg bg-gray-500 shadow-lg sm:min-h-96"
              />
            </div>
          </div>
        </div>
      </section>
      {/* about 3nd */}

      <div>
        <div className="mx-auto bg-gray-100 p-5 text-gray-800 sm:p-10 md:p-16">
          <div className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded">
            <img
              src="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg"
              alt=""
              className="h-60 w-full bg-gray-500 sm:h-96"
            />
            <div className="m-4 mx-auto -mt-16 space-y-6 bg-gray-50 p-6 pb-12 sm:mx-12 sm:px-10 lg:max-w-2xl lg:rounded-md">
              <div className="space-y-2">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="inline-block text-2xl font-semibold sm:text-3xl"
                >
                  The Best Activewear from the Nordstrom Anniversary Sale
                </a>
                <p className="text-xs text-gray-600">
                  By
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline"
                  >
                    Leroy Jenkins
                  </a>
                </p>
              </div>
              <div className="text-gray-800">
                <p>Insert the actual text content here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* team  */}
      <HotelTeam />
    </div>
  );
};

export default About;
