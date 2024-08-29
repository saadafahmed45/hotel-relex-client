import React from "react";

const WelcomeSection = () => {
  return (
    <div>
      <section className="bg-white text-gray-800">
        <div className="container space-y-2 px-4 py-6 lg:px-16 lg:py-12">
          {/* grid main  */}
          <div className="grid-col-12 grid space-x-4 space-y-4 p-2 lg:grid-cols-3">
            {/* wc text  */}
            <div>
              <h1 className="border-b border-purple-700 p-2">Welcome to </h1>
            </div>
            {/* wlc content  */}
            <div className="space-y-4">
              <h2 className="text-4xl">Hotel Relex</h2>
              <p className="space-y-2">
                Welcome to the best five-star deluxe hotel in New York. The in
                hotel elementum sesue the aucan vestibulum aliquam ustona sapien
                rutrum volutpat onec in quis the veliten.{" "}
              </p>
              <br />{" "}
              <span>
                Hotel in the miss drana varius natoque penatibus et magnis
                silver miss parturient monte nascete morbine.
              </span>
              <br />
              <p>
                Hotel ut nislan quam nestibulum ac quam nec odio elementum
                sceisue the aucan ligula. Orci varius natoque penatibus et
                magnis dis parturient monte nascete morbine
              </p>
              {/* rating card  */}
            </div>
            {/* wlc photo grid  */}
            <div>
              <div className="flex max-w-xl flex-col rounded-xl bg-gray-50 p-8 text-gray-800 shadow-sm lg:p-12">
                <div className="flex w-full flex-col">
                  <h2 className="text-center text-3xl font-semibold">
                    Customer reviews
                  </h2>
                  <div className="mb-1 mt-2 flex flex-wrap items-center space-x-2">
                    <div className="flex">
                      <button
                        type="button"
                        title="Rate 1 stars"
                        aria-label="Rate 1 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 2 stars"
                        aria-label="Rate 2 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 3 stars"
                        aria-label="Rate 3 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-yellow-700"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 4 stars"
                        aria-label="Rate 4 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-gray-400"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="Rate 5 stars"
                        aria-label="Rate 5 stars"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 text-gray-400"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                    </div>
                    <span className="text-gray-600">3 out of 5</span>
                  </div>
                  <p className="text-sm text-gray-600">861 global ratings</p>
                  <div className="mt-4 flex flex-col">
                    <div className="flex items-center space-x-1">
                      <span className="w-12 flex-shrink-0 text-sm">5 star</span>
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-gray-300">
                        <div className="h-4 w-5/6 bg-orange-500"></div>
                      </div>
                      <span className="w-12 flex-shrink-0 text-right text-sm">
                        83%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-12 flex-shrink-0 text-sm">4 star</span>
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-gray-300">
                        <div className="h-4 w-4/6 bg-orange-500"></div>
                      </div>
                      <span className="w-12 flex-shrink-0 text-right text-sm">
                        67%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-12 flex-shrink-0 text-sm">3 star</span>
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-gray-300">
                        <div className="h-4 w-3/6 bg-orange-500"></div>
                      </div>
                      <span className="w-12 flex-shrink-0 text-right text-sm">
                        50%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-12 flex-shrink-0 text-sm">2 star</span>
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-gray-300">
                        <div className="h-4 w-2/6 bg-orange-500"></div>
                      </div>
                      <span className="w-12 flex-shrink-0 text-right text-sm">
                        33%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-12 flex-shrink-0 text-sm">1 star</span>
                      <div className="h-4 flex-1 overflow-hidden rounded-sm bg-gray-300">
                        <div className="h-4 w-1/6 bg-orange-500"></div>
                      </div>
                      <span className="w-12 flex-shrink-0 text-right text-sm">
                        17%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomeSection;
