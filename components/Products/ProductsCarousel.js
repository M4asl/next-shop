import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, FreeMode } from "swiper";
import { lightTheme } from "../../styles/default";
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";

SwiperCore.use([Autoplay, FreeMode]);

const ProductsCarousel = ({ title, productsData }) => {
  // it have on deploy but it have to comment on dev mode

  if (process.browser) {
    new Swiper(".swiper-logos");
  }

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
    <LatestProductsContainer>
      <TitleText>{title}</TitleText>
      <SliderContainer>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          loop={true}
          style={{ height: "100%" }}
        >
          {productsData.map((product) => (
            <SwiperSlide key={product._id}>
              <SlideContainer>
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
                    <DescriptionProduct>
                      {product.description}
                    </DescriptionProduct>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>
    </LatestProductsContainer>
  );
};

export default ProductsCarousel;

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
  height: 100%;
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
