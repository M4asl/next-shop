import React, { useState, useEffect, useCallback, useRef } from "react";
import { PrevButton, NextButton } from "./SliderButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styled from "styled-components";
import Autoplay from "embla-carousel-autoplay";

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
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <EmblaWrapper className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  blurDataURL={slide.image}
                  placeholder="blur"
                  layout="fill"
                  className={"image"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </EmblaWrapper>
  );
};

const EmblaWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #f7f7f7;

  .embla__viewport {
    overflow: hidden;
    width: 100%;
  }

  .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }

  .embla__viewport.is-dragging {
    cursor: grabbing;
  }

  .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-left: -10px;
  }

  .embla__slide {
    position: relative;
    min-width: 100%;
    padding-left: 10px;
  }

  .embla__slide__inner {
    position: relative;
    overflow: hidden;
    padding-bottom: 56.25%;

    // height: 190px;
  }

  .embla__slide__img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    max-width: none;
    transform: translate(-50%, -50%);
  }

  .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: #1bcacd;
    padding: 0;
  }

  .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }

  .embla__button__svg {
    width: 100%;
    height: 100%;
  }

  .embla__button--prev {
    left: 27px;
  }

  .embla__button--next {
    right: 27px;
  }
`;

export default Slider;
