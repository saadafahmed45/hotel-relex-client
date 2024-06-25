import React from "react";
import Navbar from "../shared/Navbar";

const Hero = () => {
  return (
    <section className="bg-gray-100 text-gray-800 px-1 lg:px-16">
      {/* <Navbar /> */}
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-none sm:text-6xl">
            The Hotel Relex in Bangladesh
          </h1>
          <p className="mt-6 mb-8 text-md lg:text-lg sm:mb-12">
            Dictum aliquam porta in condimentum ac integer
            <br className="hidden md:inline lg:hidden" />
            turpis pulvinar, est scelerisque ligula sem
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-4 lg:px-8 py-3 text-md font-semibold rounded bg-violet-600"
            >
              Suspendisse
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-md font-semibold border rounded border-gray-800"
            >
              Malesuada
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-96 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
