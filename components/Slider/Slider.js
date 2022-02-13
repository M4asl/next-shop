import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Autoplay } from "swiper";

SwiperCore.use([Autoplay]);

const slides = [
  {
    id: 1,
    image: "/Slider/Delivery.jpg",
    title: "Free delivery",
    description: "The best things are free, including delivery",
  },
  {
    id: 2,
    image: "/Slider/Returns.jpg",
    title: "100-day free returns",
    description: "So you can take your time to decide",
  },
  {
    id: 3,
    image: "/Slider/Payment.jpg",
    title: "Easy ways to pay",
    description: "More choices, less chore",
  },
];

const Slider = () => {
  // if (process.browser) {
  //   new Swiper(".swiper-logos");
  // }
  return (
    <SliderContainer>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={"imageWrapper"}>
            <Image
              src={slide.image}
              alt={slide.title}
              blurDataURL={slide.image}
              placeholder="blur"
              layout="fill"
              className={"image"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.section`
  width: 100%;
  .imageWrapper {
    position: relative;
    padding-bottom: 56.25%;
  }
  .image {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
