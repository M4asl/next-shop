import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { lightTheme } from "../../styles/default";
import { BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";

const responsive = {
  xl: {
    breakpoint: { max: 3000, min: 1280 },
    items: 3,
    paritialVisibilityGutter: 0,
  },
  lg: {
    breakpoint: { max: 1280, min: 1024 },
    items: 2,
    paritialVisibilityGutter: 10,
  },
  md: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    paritialVisibilityGutter: 0,
  },
  sm: {
    breakpoint: { max: 768, min: 480 },
    items: 1,
    paritialVisibilityGutter: 100,
  },
  xs: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    paritialVisibilityGutter: 10,
  },
};

const Simple = ({ title, productsData }) => {
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
    <Wrapper>
      <TitleText>{title}</TitleText>
      <Carousel
        ssr
        partialVisbile
        arrows={false}
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
    </Wrapper>
  );
};

export default Simple;

const Wrapper = styled.div`
  margin: 30px;
  .image-item {
    padding: 0 10px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    margin: 20px 0px;
  }
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

const SlideContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e8e9eb;
  border-radius: 20px;
  color: ${lightTheme.text.primary};
  padding: 20px;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    height: 200px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  height: 70%;
`;

const ImageSlideContainer = styled.div`
  width: 40%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  width: 60%;
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
  max-height: 50%;
  overflow-y: scroll;
  text-align: end;
  padding-right: 10px;
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
