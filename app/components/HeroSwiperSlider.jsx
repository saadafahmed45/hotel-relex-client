"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Import the effect styles
import "swiper/css/pagination"; // Import Swiper pagination styles

import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules"; // Import Pagination module
import Image from "next/image";
// import QuickBooking from "./QuickBooking";
const sliderImages = [
  {
    id: 1,
    img: "s1.webp",
  },
];

const HeroSwiperSlider = () => {
  return (
    <div className="mt-18 flex flex-col">
      <section className="relative">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          // navigation={true}
          modules={[Navigation, EffectFade, Autoplay, Pagination]} // Include Pagination module
          effect="fade" // Set the effect to "fade"
          fadeEffect={{ crossFade: true }} // Optional: to smooth out the fade transition
          autoplay={{ delay: 4000, disableOnInteraction: false }} // Set delay to 4 seconds (4000 ms)
        >
          <SwiperSlide>
            <div className="relative">
              <img
                //               width={600}
                // height={400}
                // priority
                className="h-screen w-full select-none object-cover"
                src="s3.webp"
              />
              <div className="absolute left-1/2 top-1/2 z-40 w-full -translate-x-1/2 -translate-y-1/2 transform"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                //               width={600}
                // height={400}
                // priority
                className="h-screen w-full select-none object-cover"
                src="s2.webp"
                alt="img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                //               width={600}
                // height={400}
                // priority
                className="h-screen w-full select-none object-cover"
                src="s1.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                //               width={600}
                // height={400}
                // priority
                className="h-screen w-full select-none object-cover"
                src="s4.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default HeroSwiperSlider;
