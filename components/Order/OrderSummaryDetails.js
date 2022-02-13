import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import OrderProductList from "./OrderProductList";
import { IconContext } from "react-icons/lib";

const OrderDetails = ({ orderData, cartItems, cartDetails }) => {
  const [email, setEmail] = useState(
    orderData?.personalDetails?.email || cartDetails?.email
  );
  const [firstName, setFirstName] = useState(
    orderData?.personalDetails?.firstName || cartDetails?.firstName
  );
  const [lastName, setLastName] = useState(
    orderData?.personalDetails?.lastName || cartDetails?.lastName
  );
  const [address, setAddress] = useState(
    orderData?.shippingAddress?.address || cartDetails?.address
  );
  const [city, setCity] = useState(
    orderData?.shippingAddress?.city || cartDetails?.city
  );
  const [postalCode, setPostalCode] = useState(
    orderData?.shippingAddress?.postalCode || cartDetails?.postalCode
  );
  const [country, setCountry] = useState(
    orderData?.shippingAddress?.country || cartDetails?.country
  );
  const [paymentMethod, setPaymentMethod] = useState(
    orderData?.paymentMethod || cartDetails?.paymentMethod
  );
  const [productList, setProductList] = useState(orderData || cartItems);
  return (
    <>
      <OrderDetailsInformation>
        <OrderDetailsTitle>Personal details</OrderDetailsTitle>
        <OrderDetailsPersonalDetails>
          <ul>
            <li>Email: {email}</li>
            <li>First name: {firstName}</li>
            <li>Last name: {lastName}</li>
          </ul>
        </OrderDetailsPersonalDetails>
        <OrderDetailsShipping>
          <OrderDetailsTitle>Shipping</OrderDetailsTitle>
          <ul>
            <li>Address: {address}</li>
            <li>City: {city}</li>
            <li>Postal code: {postalCode}</li>
            <li>Country: {country}</li>
          </ul>
        </OrderDetailsShipping>
        <OrderDetailsPayment>
          <OrderDetailsTitle>Payment method</OrderDetailsTitle>
          <ul>
            <li>Payment method: {paymentMethod}</li>
          </ul>
        </OrderDetailsPayment>
        {orderData && (
          <OrderDetailsStatus>
            <OrderDetailsTitle>Status</OrderDetailsTitle>
            <OrderDetailsDelivery>
              Status: {orderData.status}
            </OrderDetailsDelivery>
            <OrderDetailsPaid>
              Is paid: {orderData.isPaid ? "Paid" : "Not paid"}
            </OrderDetailsPaid>
          </OrderDetailsStatus>
        )}
      </OrderDetailsInformation>
      <ProductsContainer>
        <ProductsTopContainer>
          <ProductsTopLeftContainer>
            <ProductsHeader>PRODUCTS</ProductsHeader>
          </ProductsTopLeftContainer>
          <ProductsTopRightContainer>
            <ProductsHeader>PRICE</ProductsHeader>
            <ProductsHeader>QUANTITY</ProductsHeader>
            <ProductsHeader>TOTAL</ProductsHeader>
          </ProductsTopRightContainer>
        </ProductsTopContainer>
        {cartItems &&
          cartItems.map((item) => (
            <>
              <ProductWrapper key={item._id}>
                <Product>
                  <ProductImageWrapper>
                    <Image
                      src={item.images}
                      alt={item.name}
                      blurDataURL={item.images}
                      placeholder="blur"
                      layout="fill"
                      className={"image"}
                    />
                  </ProductImageWrapper>
                  <ProductName>{item.name.substring(0, 30)}</ProductName>
                </Product>
                <ProductInfoContainer>
                  <Price>{item.price.toFixed(2)}$</Price>
                  <Quantity>{item.qty}</Quantity>
                  <Total>{(item.qty * item.price).toFixed(2)}$</Total>
                </ProductInfoContainer>
              </ProductWrapper>
            </>
          ))}
        {orderData &&
          orderData.orderItems.map((item) => (
            <OrderProductList key={item._id} item={item} />
          ))}
        {!productList && (
          <>
            <CartEmptyWrapper>
              <h1>You have not selected products.</h1>
              <CartEmptyImageWrapper>
                <Image
                  src="/add_to_cart.svg"
                  alt="Empty cart"
                  blurDataURL="/add_to_cart.svg"
                  placeholder="blur"
                  layout="fill"
                  className={"image"}
                />
              </CartEmptyImageWrapper>
              <TextLink>
                <IconContext.Provider>
                  <AiOutlineArrowLeft />
                </IconContext.Provider>

                <Link href="/products" passHref>
                  Back to products
                </Link>
                <IconContext.Provider>
                  <BsFillCartCheckFill />
                </IconContext.Provider>
              </TextLink>
            </CartEmptyWrapper>
          </>
        )}
      </ProductsContainer>
    </>
  );
};

export default OrderDetails;

const OrderDetailsInformation = styled.div``;

const OrderDetailsTitle = styled.h2`
  @media only ${({ theme }) => theme.breakpoints.lg} {
    font-size: 2rem;
  }
`;

const OrderDetailsPersonalDetails = styled.div`
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 1.7rem;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    font-size: 1.3rem;
  }
`;

const OrderDetailsShipping = styled.div`
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 1.7rem;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    font-size: 1.3rem;
  }
`;

const OrderDetailsPayment = styled.div`
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 1.7rem;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    font-size: 1.3rem;
  }
`;

const OrderDetailsStatus = styled.div`
  margin-bottom: 15px;
`;

const OrderDetailsDelivery = styled.div``;

const OrderDetailsPaid = styled.div``;

const ProductsContainer = styled.div`
  width: 100%;
  margin-right: 20px;
  padding: 20px;
  max-height: 550px;
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.lg} {
    font-size: 1rem;
    padding: 10px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.8rem;
    padding: 5px;
  }
`;

const ProductsTopContainer = styled.div`
  display: flex;
  letter-spacing: 0.2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 0.6rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.4rem;
  }
`;

const ProductsTopLeftContainer = styled.div`
  width: 60%;
`;

const ProductsHeader = styled.h3`
  font-weight: 500;
`;

const ProductsTopRightContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.lg} {
    padding: 15px 0px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 5px 0px;
  }
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
`;

const ProductInfoContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.1rem;
`;

const Price = styled.h4`
  font-weight: 500;
`;

const Quantity = styled.div``;

const Total = styled.h4`
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
`;

const CartEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CartEmptyImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

const TextLink = styled.h1`
  display: flex;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.text.secondary};

  a {
    color: ${({ theme }) => theme.text.primary};
  }
`;
