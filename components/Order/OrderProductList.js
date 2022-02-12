import React from "react";
import styled from "styled-components";
import Image from "next/image";

const OrderProductList = ({ item }) => {
  return (
    <ProductWrapper>
      <Product>
        <ProductImageWrapper>
          <Image
            src={item.product.images[0].url}
            alt={item.product.name}
            blurDataURL={item.product.images[0].url}
            placeholder="blur"
            layout="fill"
            className={"image"}
          />
        </ProductImageWrapper>
        <ProductName>{item.product.name}</ProductName>
      </Product>
      <ProductInfoContainer>
        <Price>{item.price.toFixed(2)}$</Price>
        <Quantity>{item.qty}</Quantity>
        <Total>{(item.qty * item.price).toFixed(2)}$</Total>
      </ProductInfoContainer>
    </ProductWrapper>
  );
};

export default OrderProductList;
const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
`;

const Product = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
`;

const ProductImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    width: 50px;
    height: 50px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 30px;
    height: 30px;
  }
`;

const ProductName = styled.div`
  margin-left: 20px;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;

const ProductInfoContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.1rem;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.7rem;
  }
`;

const Price = styled.h4`
  font-weight: 500;
`;

const Quantity = styled.div``;

const Total = styled.h4`
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
`;
