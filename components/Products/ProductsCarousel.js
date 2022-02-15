// // import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import SwiperCore, { Autoplay, FreeMode } from "swiper";
import { lightTheme } from "../../styles/default";
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";

// // SwiperCore.use([Autoplay, FreeMode]);

// // const ProductsCarousel = ({ title, productsData }) => {
// //   // it have on deploy but it have to comment on dev mode

// //   if (process.browser) {
// //     new Swiper(".swiper-logos");
// //   }

// // const dispatch = useDispatch();
// // const cart = useSelector((state) => state.cart);
// // const { cartItems } = cart;

// // const addToCartHandler = (id, qty = 1) => {
// //   if (cartItems.length > 12) {
// //     toast.error("Maximum cart size is 13 products.");
// //   }
// //   if (cartItems.length < 13) {
// //     dispatch(addToCart(id, qty));
// //     toast.success("The product has been added.");
// //   }
// // };

// //   return (
// //     <LatestProductsContainer>
// // <TitleText>{title}</TitleText>
// //       <SliderContainer>
// //         <Swiper
// //           slidesPerView={3}
// //           spaceBetween={30}
// //           freeMode={true}
// //           loop={true}
// //           style={{ height: "100%" }}
// //         >
// //           {productsData.map((product) => (
// //             <SwiperSlide key={product._id}>
// //               <SlideContainer>
// // <TopContainer>
// //   <ImageSlideContainer>
// //     <Image
// //       src={product.images[0].url}
// //       alt={product.name}
// //       blurDataURL={product.images[0].url}
// //       placeholder="blur"
// //       layout="fill"
// //     />
// //   </ImageSlideContainer>
// //   <InfoContainer>
// //     <HeaderProduct>
// //       <Link href={`/products/${product._id}`}>
// //         {product.name.substring(0, 30)}
// //       </Link>
// //       {product.name.length > 30 && "..."}
// //     </HeaderProduct>
// //     <DescriptionProduct>
// //       {product.description}
// //     </DescriptionProduct>
// //   </InfoContainer>
// // </TopContainer>
// // <BottomContainer>
// //   <PriceContainer>{product.price}$</PriceContainer>

// //   <Button onClick={() => addToCartHandler(product._id)}>
// //     Add to cart
// //     <IconContext.Provider value={{ size: "20px" }}>
// //       <BsCartPlus />
// //     </IconContext.Provider>
// //   </Button>
// // </BottomContainer>
// //               </SlideContainer>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </SliderContainer>
// //     </LatestProductsContainer>
// //   );
// // };

// // export default ProductsCarousel;

// import React, { useState, useEffect, useCallback } from "react";
// import { PrevButton, NextButton } from "../Slider/SliderButtons";
// import useEmblaCarousel from "embla-carousel-react";

// const EmblaCarousel = ({ title, productsData }) => {
//   const [viewportRef, embla] = useEmblaCarousel({
//     dragFree: true,
//     containScroll: "trimSnaps",
//   });
//   const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
//   const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

//   const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
//   const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
//   const onSelect = useCallback(() => {
//     if (!embla) return;
//     setPrevBtnEnabled(embla.canScrollPrev());
//     setNextBtnEnabled(embla.canScrollNext());
//   }, [embla]);

//   useEffect(() => {
//     if (!embla) return;
//     embla.on("select", onSelect);
//     onSelect();
//   }, [embla, onSelect]);

//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const addToCartHandler = (id, qty = 1) => {
//     if (cartItems.length > 12) {
//       toast.error("Maximum cart size is 13 products.");
//     }
//     if (cartItems.length < 13) {
//       dispatch(addToCart(id, qty));
//       toast.success("The product has been added.");
//     }
//   };

//   return (
//     <EmblaWrapper>
//       <TitleText>{title}</TitleText>
//       <div className="embla__viewport" ref={viewportRef}>
//         <div className="embla__container">
// {productsData.map((product, index) => (
//   <div className="embla__slide" key={index}>
//     <div className="embla__slide__inner">
//       <TopContainer>
//         <ImageSlideContainer>
//           <Image
//             src={product.images[0].url}
//             alt={product.name}
//             blurDataURL={product.images[0].url}
//             placeholder="blur"
//             layout="fill"
//           />
//         </ImageSlideContainer>
//         <InfoContainer>
//           <HeaderProduct>
//             <Link href={`/products/${product._id}`}>
//               {product.name.substring(0, 30)}
//             </Link>
//             {product.name.length > 30 && "..."}
//           </HeaderProduct>
//           <DescriptionProduct>
//             {product.description}
//           </DescriptionProduct>
//         </InfoContainer>
//       </TopContainer>
//       <BottomContainer>
//         <PriceContainer>{product.price}$</PriceContainer>

//         <Button onClick={() => addToCartHandler(product._id)}>
//           Add to cart
//           <IconContext.Provider value={{ size: "20px" }}>
//             <BsCartPlus />
//           </IconContext.Provider>
//         </Button>
//       </BottomContainer>
//     </div>
//   </div>
// ))}
//         </div>
//       </div>
//       <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
//       <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
//     </EmblaWrapper>
//   );
// };

// const EmblaWrapper = styled.div`
//   width: 100%;
//   position: relative;
//   // background-color: #f7f7f7;
//   padding: 20px;
//   margin-left: auto;
//   margin-right: auto;

//   .embla__viewport {
//     overflow: hidden;
//     width: 100%;
//   }

//   .embla__viewport.is-draggable {
//     cursor: move;
//     cursor: grab;
//   }

//   .embla__viewport.is-dragging {
//     cursor: grabbing;
//   }

//   .embla__container {
//     display: flex;
//     user-select: none;
//     -webkit-touch-callout: none;
//     -khtml-user-select: none;
//     -webkit-tap-highlight-color: transparent;
//     margin-left: -10px;
//   }

//   .embla__slide {
//     position: relative;
//     min-width: 600px;
//     height: 350px;
//     padding: 10px;
//     margin-right: 30px;
//     background-color: #e8e9eb;
//     border-radius: 20px;
//   }

//   .embla__slide__inner {
//     position: relative;
//     overflow: hidden;
//     height: 100%;
//     color: black;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//   }

//   .embla__slide__img {
//     position: absolute;
//     display: block;
//     top: 50%;
//     left: 50%;
//     width: auto;
//     min-height: 100%;
//     min-width: 100%;
//     max-width: none;
//     transform: translate(-50%, -50%);
//   }

//   .embla__button {
//     outline: 0;
//     cursor: pointer;
//     background-color: transparent;
//     touch-action: manipulation;
//     position: absolute;
//     z-index: 1;
//     top: 50%;
//     transform: translateY(-50%);
//     border: 0;
//     width: 30px;
//     height: 30px;
//     justify-content: center;
//     align-items: center;
//     fill: #1bcacd;
//     padding: 0;
//   }

//   .embla__button:disabled {
//     cursor: default;
//     opacity: 0.3;
//   }

//   .embla__button__svg {
//     width: 100%;
//     height: 100%;
//   }

//   .embla__button--prev {
//     left: 27px;
//   }

//   .embla__button--next {
//     right: 27px;
//   }
// `;

// const LatestProductsContainer = styled.div`
//   width: 100%;
//   overflow: hidden;
//   margin: 20px 0px;
//   display: flex;
//   flex-direction: column;
// `;

// const TitleText = styled.h1`
//   color: ${({ theme }) => theme.text.secondary};
//   margin-left: 20px;
//   @media only ${({ theme }) => theme.breakpoints.sm} {
//     font-size: 2rem;
//   }
//   @media only ${({ theme }) => theme.breakpoints.xs} {
//     font-size: 1.8rem;
//   }
// `;

// const SliderContainer = styled.div`
//   width: 2000px;
//   height: 350px;
//   margin: 0px auto;
//   @media only ${({ theme }) => theme.breakpoints.lg} {
//     width: 1500px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.lg} {
//     height: 300px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.md} {
//     height: 280px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.sm} {
//     width: 1200px;
//     height: 250px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.xs} {
//     width: 900px;
//     height: 200px;
//   }
// `;

// const SlideContainer = styled.div`
//   width: 600px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   background: #e8e9eb;
//   border-radius: 20px;
//   color: ${lightTheme.text.primary};
//   padding: 20px;
//   @media only ${({ theme }) => theme.breakpoints.lg} {
//     width: 500px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.md} {
//     width: 450px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.sm} {
//     width: 400px;
//   }
//   @media only ${({ theme }) => theme.breakpoints.xs} {
//     width: 300px;
//   }
// `;

// const TopContainer = styled.div`
//   width: 100%;
//   display: flex;
//   height: 70%;
// `;

// const ImageSlideContainer = styled.div`
//   width: 50%;
//   height: 100%;
//   position: relative;
//   border-radius: 20px;
//   overflow: hidden;
// `;

// const InfoContainer = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 0px 10px;
// `;

// const HeaderProduct = styled.div`
//   max-height: 30%;
//   text-align: center;
//   font-size: 2rem;
//   font-weight: bold;
//   a {
//     color: ${lightTheme.text.primary};
//   }
// `;

// const DescriptionProduct = styled.div`
//   max-height: 70%;
//   overflow-y: scroll;
//   text-align: end;
//   padding-right: 10px;
//   @media only ${({ theme }) => theme.breakpoints.sm} {
//     display: none;
//   }
//   @media only ${({ theme }) => theme.breakpoints.xs} {
//     display: none;
//   }
// `;

// const BottomContainer = styled.div`
//   width: 100%;
//   max-height: 25%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const PriceContainer = styled.div`
//   font-size: 2rem;
// `;

// const Button = styled.button`
//   width: 125px;
//   padding: 8px 2px;
//   font-weight: 500;
//   color: ${({ theme }) => theme.information.success};
//   border-radius: 20px;
//   background-color: white;
//   border: 2px solid ${({ theme }) => theme.text.primary};
// `;

// export default EmblaCarousel;

import React, { useState, useEffect, useCallback } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const Simple = ({ title, productsData }) => {
  return (
    <>
      <TitleText>{title}</TitleText>
      <Carousel
        ssr
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {productsData.map((product, index) => (
          <SlideContainer key={index}>
            <TopContainer>
              <ImageSlideContainer>
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  blurDataURL={product.images[0].url}
                  placeholder="blur"
                  layout="fill"
                />
              </ImageSlideContainer>
              <InfoContainer>
                <HeaderProduct>
                  <Link href={`/products/${product._id}`}>
                    {product.name.substring(0, 30)}
                  </Link>
                  {product.name.length > 30 && "..."}
                </HeaderProduct>
                <DescriptionProduct>{product.description}</DescriptionProduct>
              </InfoContainer>
            </TopContainer>
            <BottomContainer>
              <PriceContainer>{product.price}$</PriceContainer>

              <Button onClick={() => addToCartHandler(product._id)}>
                Add to cart
                <IconContext.Provider value={{ size: "20px" }}>
                  <BsCartPlus />
                </IconContext.Provider>
              </Button>
            </BottomContainer>
          </SlideContainer>
        ))}
      </Carousel>
    </>
  );
};

export default Simple;
const LatestProductsContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
  margin-left: 20px;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 2rem;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    font-size: 1.8rem;
  }
`;

const SliderContainer = styled.div`
  width: 2000px;
  height: 350px;
  margin: 0px auto;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    width: 1500px;
  }
  @media only ${({ theme }) => theme.breakpoints.lg} {
    height: 300px;
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    height: 280px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 1200px;
    height: 250px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 900px;
    height: 200px;
  }
`;

const SlideContainer = styled.div`
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e8e9eb;
  border-radius: 20px;
  color: ${lightTheme.text.primary};
  padding: 20px;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    width: 500px;
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 450px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 400px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 300px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  height: 70%;
`;

const ImageSlideContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 10px;
`;

const HeaderProduct = styled.div`
  max-height: 30%;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  a {
    color: ${lightTheme.text.primary};
  }
`;

const DescriptionProduct = styled.div`
  max-height: 70%;
  overflow-y: scroll;
  text-align: end;
  padding-right: 10px;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    display: none;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  max-height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceContainer = styled.div`
  font-size: 2rem;
`;

const Button = styled.button`
  width: 125px;
  padding: 8px 2px;
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
  border-radius: 20px;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.text.primary};
`;
