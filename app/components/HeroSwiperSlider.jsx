"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Import the effect styles
import "swiper/css/pagination"; // Import Swiper pagination styles

import { Navigation, EffectFade, Autoplay, Pagination } from "swiper/modules"; // Import Pagination module
import Image from "next/image";
// import QuickBooking from "./QuickBooking";

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
              <Image
                width={600}
  height={400}
                  // priority
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg"
              />
              <div className="absolute left-1/2 top-1/2 z-40 w-full -translate-x-1/2 -translate-y-1/2 transform"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
            <Image
                width={600}
  height={400}
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/19075392/pexels-photo-19075392/free-photo-of-deckchairs-by-swimming-pool.jpeg"
                alt="img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
        <Image
                width={600}
  height={400}
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
         <Image
                width={600}
  height={400}
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/10463590/pexels-photo-10463590.jpeg"
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
