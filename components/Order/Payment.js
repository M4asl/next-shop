import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import ButtonContainer from "./ButtonContainer";

const Payment = ({ update, step, setStep }) => {
  const [paymentMethod, setPaymentMethod] = useState();

  const handleChange = (e) => {
    setPaymentMethod({ paymentMethod: e.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    update(paymentMethod);
    if (step === 4) return;
    setStep((step) => step + 1);
  };

  const backStep = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  return (
    <PersonalDetailsWrapper>
      <FormContainer onSubmit={nextStep}>
        <TitleHeader>Payment method</TitleHeader>
        <FormGroup>
          <StyledInput
            type="radio"
            name="drone"
            id="cash_radio"
            value="Cash"
            onChange={handleChange}
          />
          <Label htmlFor="cash_radio">Cash</Label>
        </FormGroup>
        <FormGroup>
          <StyledInput
            type="radio"
            name="drone"
            id="paypal_radio"
            value="Paypal"
            onChange={handleChange}
          />
          <Label htmlFor="paypal_radio">Paypal</Label>
        </FormGroup>
        <ButtonContainer
          step={step}
          backStep={backStep}
          nextStep={nextStep}
          disabled={!paymentMethod}
        />
      </FormContainer>
      <ImageWrapper>
        <Image
          src="/payment.svg"
          alt="Empty cart"
          blurDataURL="/payment.svg"
          placeholder="blur"
          layout="fill"
          className={"image"}
        />
      </ImageWrapper>
    </PersonalDetailsWrapper>
  );
};

const PersonalDetailsWrapper = styled.div`
  width: 500px;
  height: 700px;
  margin-top: 50px;
  border-radius: 30px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 70%;
    height: 550px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    height: 400px;
  }
`;

const TitleHeader = styled.h1`
  font-size: 2rem;
`;

const FormContainer = styled.form`
  max-width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    padding: 10px 4px;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 700;
  align-self: start;
`;

const StyledInput = styled.input`
  width: 20px;
  height: 20px;
`;

const ImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  top: 19%;
  left: 15%;
  position: absolute;
  z-index: -100;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 300px;
    height: 300px;
    left: 1%;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 250px;
    height: 250px;
    left: -15%;
    top: 40%;
  }
`;

export default Payment;
