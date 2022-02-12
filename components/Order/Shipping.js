import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { lightTheme } from "../../styles/default";
import Image from "next/image";
import ButtonContainer from "./ButtonContainer";
import { saveShippingAddress } from "../../redux/actions/cartActions";

const Shipping = ({ orderDetails, update, step, setStep, cookie }) => {
  const shippingAddress = cookie?.shippingAddress
    ? JSON.parse(cookie?.shippingAddress)
    : {};
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    setValues({
      address: orderDetails?.address || shippingAddress?.address || "",
      city: orderDetails?.city || shippingAddress?.city || "",
      postalCode: orderDetails?.postalCode || shippingAddress?.postalCode || "",
      country: orderDetails?.country || shippingAddress?.country || "",
    });
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    update(values);
    if (step === 4) return;
    setStep((step) => step + 1);
    dispatch(
      saveShippingAddress(
        values.address,
        values.city,
        values.postalCode,
        values.country
      )
    );
  };

  const backStep = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  return (
    <PersonalDetailsWrapper>
      <FormContainer onSubmit={nextStep}>
        <TitleHeader>Shipping details</TitleHeader>
        <FormGroup>
          <Label htmlFor="address_field">Address</Label>
          <StyledInput
            type="text"
            id="address_field"
            value={values.address}
            onChange={handleChange("address")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city_field">City</Label>
          <StyledInput
            type="text"
            id="city_field"
            value={values.city}
            onChange={handleChange("city")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="postal_code_field">Postal code</Label>
          <StyledInput
            type="text"
            id="postal_code_field"
            value={values.postalCode}
            onChange={handleChange("postalCode")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="country_field">Country</Label>
          <StyledInput
            type="text"
            id="country_field"
            value={values.country}
            onChange={handleChange("country")}
          />
        </FormGroup>
        <ButtonContainer
          step={step}
          backStep={backStep}
          nextStep={nextStep}
          disabled={
            !values.address ||
            !values.city ||
            !values.postalCode ||
            !values.country
          }
        />
      </FormContainer>
      <ImageWrapper>
        <Image
          src="/shipping.svg"
          alt="Empty cart"
          blurDataURL="/shipping.svg"
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
    height: 500px;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    height: 400px;
  }
`;

const TitleHeader = styled.h1`
  font-size: 2rem;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1.5rem;
  }
`;

const FormContainer = styled.form`
  max-width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 5px;
  }
`;

const FormGroup = styled.div`
  width: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    font-size: 1rem;
    margin: 5px;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
  align-self: start;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
    margin-bottom: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${lightTheme.bg.background};
  &:hover {
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.text.secondary};
  }
  &:active &:focus {
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.text.secondary};
  }
`;

const ImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  top: 30%;
  left: -62%;
  position: absolute;
  z-index: -100;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    left: -46%;
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 300px;
    height: 300px;
    top: -6%;
    left: 20%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
    height: 200px;
    top: -1%;
    left: 31%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 140px;
    height: 140px;
    top: -1%;
    left: 31%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    top: -4%;
    left: 19%;
  }
`;

export default Shipping;
