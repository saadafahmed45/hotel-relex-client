import Image from "next/image";
import Hero from "./components/Hero";
import Bannar from "./components/Bannar";
import Rooms from "./rooms/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <Rooms />
      <Bannar />
    </main>
  );
}
