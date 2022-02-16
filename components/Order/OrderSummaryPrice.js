import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { payOrder } from "../../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const OrderSummaryPrice = ({
  itemsPriceNetto,
  shippingPrice,
  taxPrice,
  totalPrice,
  order,
}) => {
  const [sdkReady, setSdkReady] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    loading: loadingPay,
    error: errorPay,
    success,
  } = useSelector((state) => state.orderPay);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    if (order && !order.isPaid && order.paymentMethod === "Paypal") {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, []);

  useEffect(() => {
    if (success) {
      router.reload();
      dispatch({ type: ORDER_PAY_RESET });
    }
    if (errorPay) {
      toast.error(errorPay);
    }
  }, [success, errorPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };

  return (
    <OrderSummaryPriceList>
      <OrderSummaryPriceListItem>
        <OrderSummaryItem>Products</OrderSummaryItem>
        <OrderSummaryPriceItem>{itemsPriceNetto}$</OrderSummaryPriceItem>
      </OrderSummaryPriceListItem>
      <OrderSummaryPriceListItem>
        <OrderSummaryItem>Shipping</OrderSummaryItem>
        <OrderSummaryPriceItem>
          {shippingPrice.toFixed(2)}$
        </OrderSummaryPriceItem>
      </OrderSummaryPriceListItem>
      <OrderSummaryPriceListItem>
        <OrderSummaryItem>Tax</OrderSummaryItem>
        <OrderSummaryPriceItem>{taxPrice}$</OrderSummaryPriceItem>
      </OrderSummaryPriceListItem>
      <OrderSummaryPriceListItem>
        <OrderSummaryItem>Total</OrderSummaryItem>
        <OrderSummaryPriceItem>{totalPrice.toFixed(2)}$</OrderSummaryPriceItem>
      </OrderSummaryPriceListItem>
      {order && !order.isPaid && order.paymentMethod === "Paypal" && (
        <OrderSummaryPriceListItem>
          {loadingPay && <Loader />}
          {!sdkReady ? (
            "Loading"
          ) : (
            <PayPalButton
              amount={order.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </OrderSummaryPriceListItem>
      )}
    </OrderSummaryPriceList>
  );
};

export default OrderSummaryPrice;

const OrderSummaryPriceList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.5rem;
  }
`;

const OrderSummaryPriceListItem = styled.li`
  display: flex;
  justify-content: space-between;
  & > * {
    width: 100%;
    margin: 0px auto;
    margin-top: 10px;
  }
`;

const OrderSummaryItem = styled.p``;

const OrderSummaryPriceItem = styled.p`
  color: ${({ theme }) => theme.information.success};
  letter-spacing: 0.1rem;
  font-weight: 500;
  text-align: end;
`;
