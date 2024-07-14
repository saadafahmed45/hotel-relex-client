"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import QuickBooking from './QuickBooking';



const HeroSwiperSlider = () => {
 
  return (
     <div className='flex flex-col'>
        <section className='relative'>
           
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
           <SwiperSlide>
              <div className='h-screen'>
                     <img className='object-cover select-none'
                        src="https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        
                     />
              </div>
        </SwiperSlide>
           <SwiperSlide>
              <div className='h-screen '>
                 <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img" />
              </div></SwiperSlide>
           <SwiperSlide>
             <div className='h-screen'>
                 <img src="https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </div></SwiperSlide>
      </Swiper>
        </section>
        <QuickBooking />
    </div>
  )
}

export default HeroSwiperSlider;