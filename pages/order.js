import React, { useState } from "react";
import { parseCookies } from "nookies";
import { wrapper } from "../redux/store";
import PersonalDetails from "../components/Order/PersonalDetails";
import Shipping from "../components/Order/Shipping";
import Payment from "../components/Order/Payment";
import PlaceOrder from "../components/Order/PlaceOrder";
import styled from "styled-components";

const OrderSteps = ({ cookie }) => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
  });

  const updateData = (newData) => {
    setOrderDetails((orderDetails) => {
      return Object.assign(orderDetails, newData);
    });
  };

  return (
    <OrderWrapper>
      <OrderTitle>Order</OrderTitle>
      <ProgressContainer>
        <progress max="4" value={step} />
      </ProgressContainer>
      {step === 1 && (
        <PersonalDetails
          update={updateData}
          step={step}
          setStep={setStep}
          orderDetails={orderDetails}
          cookie={cookie}
        />
      )}
      {step === 2 && (
        <Shipping
          update={updateData}
          step={step}
          setStep={setStep}
          orderDetails={orderDetails}
          cookie={cookie}
        />
      )}
      {step === 3 && (
        <Payment
          update={updateData}
          step={step}
          setStep={setStep}
          orderDetails={orderDetails}
        />
      )}
      {step === 4 && (
        <PlaceOrder
          update={updateData}
          step={step}
          setStep={setStep}
          orderDetails={orderDetails}
          cookie={cookie}
        />
      )}
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  width: 100%;
  padding: 75px 75px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    padding: 30px 30px 0px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 20px 15px 0px;
  }
`;

const ProgressContainer = styled.div`
  width: 1000px;
  progress {
    width: 100%;
    height: 10px;
    border-radius: 20px;
  }
  progress::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.text.primary};
    border-radius: 20px;
  }
  progress::-webkit-progress-value {
    border-radius: 20px;
    background-color: ${({ theme }) => theme.information.success};
  }
  @media only ${({ theme }) => theme.breakpoints.lg} {
    width: 80%;
  }
`;

const OrderTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
`;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = await parseCookies({ req });
      const { token, cartItems } = await parseCookies({ req });
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      if (!cartItems) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { cookie },
      };
    }
);

export default OrderSteps;
