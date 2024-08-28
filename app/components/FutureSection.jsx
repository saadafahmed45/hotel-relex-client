import React from "react";

const FutureSection = () => {
  return (
    <section className="bg-white p-4 text-gray-800 lg:p-8">
      <div className="container mx-auto space-y-12">
        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
          <img
            src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg"
            alt=""
            className="aspect-video h-80 bg-gray-500"
          />
          <div className="flex flex-1 flex-col justify-center bg-gray-50 p-6">
            <span className="text-xs uppercase text-gray-600">Discover</span>
            <h3 className="text-3xl font-bold">The Restaurant</h3>
            <p className="my-6 text-gray-600">
              Restaurant inilla duiman at elit finibus viverra nec a lacus themo
              the nesudea seneoice misuscipit non sagie the fermen ziverra
              tristiue duru the ivite dianne onen nivami acsestion augue artine.
            </p>
            <button
              type="button"
              className="self-start rounded bg-purple-600 px-6 py-2 font-semibold text-gray-100"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
          <img
            src="https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg"
            alt=""
            className="aspect-video h-80 bg-gray-500"
          />
          <div className="flex flex-1 flex-col justify-center bg-gray-50 p-6">
            <span className="text-xs uppercase text-gray-600">Experiences</span>
            <h3 className="text-3xl font-bold">Spa Center</h3>
            <p className="my-6 text-gray-600">
              Spa center inilla duiman at elit finibus viverra nec a lacus themo
              the nesudea seneoice misuscipit non sagie the fermen ziverra
              tristiue duru the ivite dianne onen nivami acsestion augue artine.
            </p>
            <button
              type="button"
              className="self-start rounded bg-purple-600 px-6 py-2 font-semibold text-gray-100"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
          <img
            src="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg"
            alt=""
            className="aspect-video h-80 bg-gray-500"
          />
          <div className="flex flex-1 flex-col justify-center bg-gray-50 p-6">
            <span className="text-xs uppercase text-gray-600">Modern</span>
            <h3 className="text-3xl font-bold">Fitness Center</h3>
            <p className="my-6 text-gray-600">
              Fitness Center inilla duiman at elit finibus viverra nec a lacus
              themo the nesudea seneoice misuscipit non sagie the fermen ziverra
              tristiue duru the ivite dianne onen nivami acsestion augue artine.
            </p>
            <button
              type="button"
              className="self-start rounded bg-purple-600 px-6 py-2 font-semibold text-gray-100"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
