import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";

import Reviews from "../../components/Reviews/ReviewList";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons/lib";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

const SingleProductDetails = () => {
  if (process.browser) {
    new Swiper(".swiper-logos");
  }
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { productDetails, loading } = useSelector(
    (state) => state.productDetails
  );
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { _id, images, name, description, price } = productDetails;

  const addToCartHandler = (id, qty = 1) => {
    if (cartItems.length > 12) {
      toast.error("Maximum cart size is 13 products.");
    }
    if (cartItems.length < 13) {
      dispatch(addToCart(id, qty));
      toast.success("The product has been added.");
    }
  };
  return (
    <>
      <ProductDetailsWrapper>
        <ProductDetailsTopWrapper>
          <ImagesWrapper>
            <Swiper
              style={{
                "--swiper-navigation-color": "black",
                "--swiper-pagination-color": "black",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {images.map((image, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={image.url}
                    alt={name}
                    blurDataURL={image.url}
                    placeholder="blur"
                    layout="fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {images.map((image, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={image.url}
                    alt={name}
                    blurDataURL={image.url}
                    placeholder="blur"
                    layout="fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ImagesWrapper>
          <InfoWrapper>
            <ProductName>{name}</ProductName>
            <CenterContainer>
              <ProductPrice>{price}$</ProductPrice>
              <Button onClick={() => addToCartHandler(_id)}>
                Add to cart
                <IconContext.Provider value={{ size: "20px" }}>
                  <BsCartPlus />
                </IconContext.Provider>
              </Button>
            </CenterContainer>
          </InfoWrapper>
        </ProductDetailsTopWrapper>
        <ProductDescription>{description}</ProductDescription>
      </ProductDetailsWrapper>
      <Reviews />
    </>
  );
};

const ProductDetailsWrapper = styled.div`
  max-width: 1600px;
  padding: 75px 50px 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ProductDetailsTopWrapper = styled.div`
  width: 80%;
  height: 80%;
  // padding: 75px 50px 0px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ImagesWrapper = styled.div`
  width: 500px;
  height: 500px;
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  body {
    background: #000;
    color: #000;
  }

  .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .mySwiper2 {
    height: 80%;
    width: 100%;
  }

  .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoWrapper = styled.div`
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ProductName = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;

const ProductDescription = styled.h3`
  width: 80%;
  margin: 0 auto;
  font-size: 2.5rem;
  line-height: 2.5;
  font-weight: 500;
`;

const CenterContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductPrice = styled.span`
  font-size: 3rem;
`;

const Button = styled.button`
  width: 150px;
  padding: 10px 0px;
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
  border-radius: 20px;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.text.primary};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UpdateButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
`;
const DeleteButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.information.dangerous};
  border: 2px solid ${({ theme }) => theme.information.dangerous};
`;

export default SingleProductDetails;
