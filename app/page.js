import Image from "next/image";
import Hero from "./components/Hero";
import Rooms from "./rooms/page";
import Testimonial from "./components/Testimonial";
import HeroSwiperSlider from "./components/HeroSwiperSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <Rooms />
      <Testimonial />
    </>
  );
}
