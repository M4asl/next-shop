import React, { useState } from "react";
import OrderSummaryPrice from "./OrderSummaryPrice";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OrderSummaryDetails from "./OrderSummaryDetails";
import styled from "styled-components";

const OrderDetails = ({ orderData, roleType }) => {
  const [order, setOrder] = useState(orderData);
  const [role, setRole] = useState(roleType);

  const { shippingPrice, totalPrice, taxPrice, isPaid } = order;

  let orderItemsData = [];

  if (order?.orderItems) {
    const orderItems = order.orderItems.map((item) => {
      orderItemsData.push(item.product);
    });
  }

  const itemsPriceNetto = (totalPrice - shippingPrice - taxPrice).toFixed(2);
  const itemsPriceBrutto = (totalPrice - shippingPrice).toFixed(2);
  return (
    <>
      <OrderWrapper>
        <PlaceOrderTop>
          <Button>
            <AiOutlineArrowLeft style={{ color: "white" }} />
            <Link href={role === "admin" ? `/admin/orders` : `/orders/my`}>
              Back to orders
            </Link>
          </Button>
          <PlaceOrderTitle>Order: {order?._id}</PlaceOrderTitle>
        </PlaceOrderTop>
        <PlaceOrderBottom>
          <PlaceOrderLeftSide>
            <OrderSummaryDetails orderData={order} role={role} />
          </PlaceOrderLeftSide>
          <PlaceOrderRightSide>
            <OrderSummaryWrapper>
              <PlaceOrderTitle>Order summary</PlaceOrderTitle>
              <OrderSummaryPrice
                itemsPriceNetto={itemsPriceNetto}
                itemsPriceBrutto={itemsPriceBrutto}
                shippingPrice={shippingPrice}
                taxPrice={taxPrice}
                totalPrice={totalPrice}
                isPaid={isPaid}
                order={order}
              />
            </OrderSummaryWrapper>
          </PlaceOrderRightSide>
        </PlaceOrderBottom>
      </OrderWrapper>
    </>
  );
};

const OrderWrapper = styled.div`
  width: 100%;
  padding: 75px 75px 0px;

  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 50px 10px 0px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 40px 4px 0px;
  }
`;

const PlaceOrderTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const Button = styled.button`
  width: 180px;
  height: 35px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: ${({ theme }) => theme.text.secondary};
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 120px;
    height: 30px;
    font-size: 1rem;
  }
`;
const PlaceOrderBottom = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  @media only ${({ theme }) => theme.breakpoints.md} {
    flex-direction: column;
    align-items: center;
  }
`;

const PlaceOrderTitle = styled.h2`
  text-align: center;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.8rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1.2rem;
  }
`;

const OrderSummaryWrapper = styled.div`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text.secondary};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PlaceOrderLeftSide = styled.div`
  width: 60%;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 80%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
  }
`;

const PlaceOrderRightSide = styled.div`
  width: 30%;
  @media only ${({ theme }) => theme.breakpoints.md} {
    margin-top: 20px;
    width: 80%;
  }
`;

export default OrderDetails;
