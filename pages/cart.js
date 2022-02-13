import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons/lib";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.getCurrentUserDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    if (!userInfo) {
      router.push("/login");
    }
    router.push("/order");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <CartWrapper>
      <CartTitle>Cart</CartTitle>
      <CartProductsWrapper>
        <CartProductsTop>
          <CartProductsTopLeft>
            <CartHeader>PRODUCTS</CartHeader>
          </CartProductsTopLeft>
          <CartProductsTopRight>
            <CartHeader>PRICE</CartHeader>
            <CartHeader>QUANTITY</CartHeader>
            <CartHeader>TOTAL</CartHeader>
          </CartProductsTopRight>
        </CartProductsTop>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <>
              <CartProductWrapper key={item.product}>
                <CartProduct>
                  <CartProductImageWrapper>
                    <Image
                      src={item.images}
                      alt={item.name}
                      blurDataURL={item.images}
                      placeholder="blur"
                      layout="fill"
                      className={"image"}
                    />
                  </CartProductImageWrapper>
                  <CartProductName>
                    {item.name.substring(0, 30)}
                    {item.name.length > 30 && "..."}
                  </CartProductName>
                </CartProduct>
                <CartProductInfo>
                  <Price>{item.price.toFixed(2)}$</Price>
                  <Quantity>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {item.countInStock > 10
                        ? [...Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )
                        : [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                    </select>
                  </Quantity>
                  <Total>{(item.qty * item.price).toFixed(2)}$</Total>
                </CartProductInfo>
                <ButtonRemove
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <BsTrash />
                  </IconContext.Provider>
                </ButtonRemove>
              </CartProductWrapper>
            </>
          ))
        ) : (
          <>
            <CartEmptyWrapper>
              <CartEmptyHeader>Cart is empty</CartEmptyHeader>
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
                <IconContext.Provider value={{ size: "20px" }}>
                  <AiOutlineArrowLeft />
                </IconContext.Provider>

                <Link href="/products" passHref>
                  Back to products
                </Link>
                <IconContext.Provider value={{ size: "20px" }}>
                  <BsFillCartCheckFill />
                </IconContext.Provider>
              </TextLink>
            </CartEmptyWrapper>
          </>
        )}
      </CartProductsWrapper>
      <CartProductsCheckoutWrapper>
        <CartProductsCheckoutTop>
          <CartProductsCheckoutItem>Subtotal</CartProductsCheckoutItem>
          <CartProductsCheckoutItemPrice>
            {cartItems.length > 0
              ? cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)
              : "0"}
            $
          </CartProductsCheckoutItemPrice>
        </CartProductsCheckoutTop>
        <Button disabled={cartItems.length === 0} onClick={checkoutHandler}>
          Proceed to Checkout
        </Button>
      </CartProductsCheckoutWrapper>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled.div`
  width: 100%;
  height: 90vh;
  padding: 75px 75px 0px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 30px 2px 0px;
    height: 50vh;
  }
`;
const CartTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 2rem;
  }
`;

const CartProductsWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
  min-height: 550px;
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 5px;
    min-height: 350px;
  }
`;

const CartProductsTop = styled.div`
  display: flex;
  letter-spacing: 0.2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.xs} {
    letter-spacing: 0;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding-bottom: 5px;
  }
`;

const CartHeader = styled.h3`
  font-weight: 500;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.4rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.8rem;
  }
`;

const CartProductsTopLeft = styled.div`
  width: 60%;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 50%;
  }
`;
const CartProductsTopRight = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 50%;
  }
`;

const CartProductsCheckoutWrapper = styled.div`
  width: 30%;
  height: 30%;
  margin: 30px 0px;
  align-self: end;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 50%;
    font-size: 1.2rem;
  }
`;

const CartProductsCheckoutTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartProductsCheckoutItem = styled.p``;

const CartProductsCheckoutItemPrice = styled.p`
  color: ${({ theme }) => theme.information.success};
  letter-spacing: 0.1rem;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin: 20px 0px;
  background: transparent;
  color: ${({ theme }) => theme.information.success};
  border: 2px solid ${({ theme }) => theme.information.success};
  @media only ${({ theme }) => theme.breakpoints.xs} {
    border: 1px solid ${({ theme }) => theme.information.success};
    height: 30px;
  }
`;

const CartProductWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 8px 0px;
  }
`;

const CartProduct = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 50%;
  }
`;

const CartProductImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 50px;
    height: 50px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 25px;
    height: 25px;
  }
`;
const CartProductName = styled.div`
  margin-left: 20px;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.4rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    font-size: 0.9rem;
    margin-left: 5px;
  }
`;

const ButtonRemove = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  color: ${({ theme }) => theme.information.dangerous};
  background-color: transparent;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 20px;
    height: 20px;
  }
`;

const CartProductInfo = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.1rem;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.4rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 50%;
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    font-size: 0.8rem;
    letter-spacing: 0;
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
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
    height: 200px;
  }
`;

const CartEmptyHeader = styled.h1`
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 2rem;
  }
`;

const TextLink = styled.h1`
  display: flex;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.text.secondary};

  a {
    color: ${({ theme }) => theme.text.primary};
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 2rem;
  }
`;
