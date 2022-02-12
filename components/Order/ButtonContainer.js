import React from "react";
import styled from "styled-components";

const ButtonContainer = ({
  step,
  backStep,
  nextStep,
  disabled,
  placeOrderHandler,
}) => {
  return (
    <ButtonWrapper
      style={
        step === 1
          ? { justifyContent: "flex-end" }
          : { justifyContent: "space-between" }
      }
    >
      {step !== 1 && <Button onClick={backStep}>Back</Button>}

      {step !== 4 &&
        (disabled ? (
          <ButtonDisabled disabled={disabled}>Next</ButtonDisabled>
        ) : (
          <Button onClick={nextStep} disabled={disabled} type="submit">
            Next
          </Button>
        ))}
      {step === 4 && (
        <Button type="submit" onClick={placeOrderHandler}>
          Place order
        </Button>
      )}
    </ButtonWrapper>
  );
};

export default ButtonContainer;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 10 + px;
  display: flex;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    padding: 0 8px;
  }
`;

const Button = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 80px;
    height: 30px;
    font-size: 1rem;
  }
`;

const ButtonDisabled = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: grey;
  border: 2px solid grey;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 80px;
    font-size: 1rem;
    height: 30px;
  }
`;
