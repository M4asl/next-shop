import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import Image from "next/image";

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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};

const Simple = () => {
  return (
    <Carousel
      ssr
      autoPlay
      infinite
      arrows={false}
      autoPlaySpeed={3000}
      itemClass="image-item"
      responsive={responsive}
    >
      {slides.map((slide, index) => (
        <Wrapper key={index}>
          <Image
            src={slide.image}
            alt={slide.title}
            blurDataURL={slide.image}
            placeholder="blur"
            layout="fill"
          />
        </Wrapper>
      ))}
    </Carousel>
  );
};

export default Simple;

const Wrapper = styled.div`
  min-width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  img {
    width: 100%;
  }
`;
