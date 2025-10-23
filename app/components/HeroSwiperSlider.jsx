"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

const HeroSwiperSlider = () => {
  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-screen w-full">
            <img
              src="/s3.webp"
              alt="Luxury Hotel"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h2 className="animate-fadeInUp mb-4 text-4xl font-bold md:text-6xl">
                Experience True Comfort
              </h2>
              <p className="animate-fadeInUp mb-8 max-w-2xl text-lg delay-200 md:text-xl">
                Stay in luxury with premium rooms and world-class service.
              </p>
              <button className="rounded-full bg-violet-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-violet-700">
                Book Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-screen w-full">
            <img
              src="/s2.webp"
              alt="Relax"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h2 className="animate-fadeInUp mb-4 text-4xl font-bold md:text-6xl">
                Relax. Refresh. Recharge.
              </h2>
              <p className="animate-fadeInUp mb-8 max-w-2xl text-lg delay-200 md:text-xl">
                Your perfect escape awaits at our finest destinations.
              </p>
              <button className="rounded-full bg-violet-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-violet-700">
                Book Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-screen w-full">
            <img
              src="/s1.webp"
              alt="Elegant Room"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h2 className="animate-fadeInUp mb-4 text-4xl font-bold md:text-6xl">
                A New Definition of Elegance
              </h2>
              <p className="animate-fadeInUp mb-8 max-w-2xl text-lg delay-200 md:text-xl">
                Discover rooms that blend comfort with sophistication.
              </p>
              <button className="rounded-full bg-violet-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-violet-700">
                Book Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative h-screen w-full">
            <img
              src="/s4.webp"
              alt="Luxury Stay"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <h2 className="animate-fadeInUp mb-4 text-4xl font-bold md:text-6xl">
                Luxury Redefined
              </h2>
              <p className="animate-fadeInUp mb-8 max-w-2xl text-lg delay-200 md:text-xl">
                Where every stay feels like home, only better.
              </p>
              <button className="rounded-full bg-violet-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-violet-700">
                Book Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSwiperSlider;
