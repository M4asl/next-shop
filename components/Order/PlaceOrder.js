import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import ButtonContainer from "./ButtonContainer";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/orderActions";
import OrderSummaryPrice from "./OrderSummaryPrice";
import OrderSummaryDetails from "./OrderSummaryDetails";
import { toast } from "react-toastify";

const PlaceOrder = ({ orderDetails, update, step, setStep, cookie }) => {
  const dispatch = useDispatch();
  const cartItems = cookie?.cartItems ? JSON.parse(cookie?.cartItems) : {};
  const router = useRouter();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const {
    email,
    firstName,
    lastName,
    address,
    city,
    postalCode,
    country,
    paymentMethod,
  } = orderDetails;
  if (
    !email ||
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !postalCode ||
    !country ||
    !paymentMethod
  ) {
    router.reload();
  }

  useEffect(() => {
    if (success) {
      router.push(`/orders/${order._id}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPriceBrutto = addDecimals(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );

  const shippingPrice = addDecimals(Number(itemsPriceBrutto)) > 100 ? 0 : 100;
  const itemsPriceNetto = (
    addDecimals(Number(itemsPriceBrutto)) / 1.23
  ).toFixed(2);
  const taxPrice = (
    addDecimals(Number(itemsPriceBrutto)) - addDecimals(Number(itemsPriceNetto))
  ).toFixed(2);
  const totalPrice =
    Number(itemsPriceNetto) + Number(taxPrice) + Number(shippingPrice);

  const backStep = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        personalDetails: {
          email,
          firstName,
          lastName,
        },
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        itemsPrice: itemsPriceNetto,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <PlaceOrderWrapper>
      <PlaceOrderLeftSide>
        <OrderSummaryDetails cartItems={cartItems} cartDetails={orderDetails} />
      </PlaceOrderLeftSide>
      <PlaceOrderRightSide>
        <OrderSummaryWrapper>
          <PlaceOrderTitle>Order summary</PlaceOrderTitle>
          <OrderSummaryPrice
            itemsPriceBrutto={itemsPriceBrutto}
            shippingPrice={shippingPrice}
            itemsPriceNetto={itemsPriceNetto}
            taxPrice={taxPrice}
            totalPrice={totalPrice}
          />
          <ButtonContainer
            step={step}
            backStep={backStep}
            placeOrderHandler={placeOrderHandler}
          />
        </OrderSummaryWrapper>
      </PlaceOrderRightSide>
    </PlaceOrderWrapper>
  );
};

export default PlaceOrder;

const PlaceOrderWrapper = styled.div`
  width: 100%;
  padding: 75px 75px 0px;
  display: flex;
  @media only ${({ theme }) => theme.breakpoints.md} {
    flex-direction: column;
    align-items: center;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 50px 10px 0px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 30px 4px 0px;
  }
`;

const PlaceOrderLeftSide = styled.div`
  width: 60%;
  margin-bottom: 30px;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 80%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
  }
`;
const PlaceOrderTitle = styled.h2`
  font-size: 2rem;
`;

const PlaceOrderRightSide = styled.div`
  width: 40%;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 80%;
  }
`;

const OrderSummaryWrapper = styled.div`
  height: 280px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text.secondary};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media only ${({ theme }) => theme.breakpoints.md} {
    // padding: 5px;
  }
`;
