import Image from "next/image";
import Hero from "./components/Hero";
import Rooms from "./rooms/page";
import Testimonial from "./components/Testimonial";
import HeroSwiperSlider from "./components/HeroSwiperSlider";
import WelcomeSection from "./components/WelcomeSection";
import FutureSection from "./components/FutureSection";
import FaqSection from "./components/FaqSection";
import FeatureRooms from "./components/FeatureRooms";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroSwiperSlider />
      <WelcomeSection />
      {/* <Rooms /> */}
      <FeatureRooms />
      <FaqSection />
      <FutureSection />
      <Testimonial />
    </>
  );
}
