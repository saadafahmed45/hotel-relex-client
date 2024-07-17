"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import QuickBooking from "./QuickBooking";

const HeroSwiperSlider = () => {
  return (
    <div className="flex flex-col">
      <section className="relative">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper !h-[600px]"
        >
          <SwiperSlide>
            <div className="relative">
              <div className="absolute bottom-[470px] left-0 right-0">
                <motion.h1
                  whileInView={{ y: 0, opacity: 1 }}
                  initial={{ y: 100, opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, stiffness: 100 }}
                  className="text-3xl"
                >
                  Hello World
                </motion.h1>
              </div>
              <img
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <img
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <img
                className="h-screen w-full select-none object-cover"
                src="https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <div className="absolute bottom-0 left-0 right-0 z-40 w-full">
        <QuickBooking />
      </div>
    </div>
  );
};

export default HeroSwiperSlider;
