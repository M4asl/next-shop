import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { lightTheme } from "../../styles/default";
import Image from "next/image";
import ButtonContainer from "./ButtonContainer";
import { savePersonalDetails } from "../../redux/actions/cartActions";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const PersonalDetails = ({ orderDetails, update, step, setStep, cookie }) => {
  const personalDetails = cookie?.personalDetails
    ? JSON.parse(cookie?.personalDetails)
    : {};

  const dispatch = useDispatch();
  const { userInfo, error, loading } = useSelector(
    (state) => state.getCurrentUserDetails
  );
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    setValues({
      email: orderDetails?.email || userInfo?.email || "",
      firstName: orderDetails?.firstName || personalDetails?.firstName || "",
      lastName: orderDetails?.lastName || personalDetails?.lastName || "",
    });
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const regExFirstNameAndLastName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  const regExEmail = /\S+@\S+\.\S+/;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const nextStep = (e) => {
    if (values.email && values.firstName && values.lastName) {
      e.preventDefault();
      update(values);
      if (step === 4) return;
      setStep((step) => step + 1);
      dispatch(savePersonalDetails(values.firstName, values.lastName));
    }
  };

  const backStep = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  return (
    <PersonalDetailsWrapper>
      <FormContainer onSubmit={nextStep}>
        <TitleHeader>Personal details</TitleHeader>
        <FormGroup>
          <Label htmlFor="email_field">Email</Label>
          <StyledInput
            type="email"
            id="email_field"
            value={values.email}
            onChange={handleChange("email")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="first_name_field">First name</Label>
          <StyledInput
            type="text"
            id="last_name_field"
            value={values.firstName}
            onChange={handleChange("firstName")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="last_name_field">Last name</Label>
          <StyledInput
            type="text"
            id="last_name_field"
            value={values.lastName}
            onChange={handleChange("lastName")}
          />
        </FormGroup>
        <ButtonContainer
          step={step}
          backStep={backStep}
          nextStep={nextStep}
          disabled={
            !values.email.match(regExEmail) ||
            !values.firstName.match(regExFirstNameAndLastName) ||
            !values.lastName.match(regExFirstNameAndLastName)
          }
        />
      </FormContainer>
      <ImageWrapper>
        <Image
          src="/personal_details.svg"
          alt="Empty cart"
          blurDataURL="/personal_details.svg"
          placeholder="blur"
          layout="fill"
          className={"image"}
        />
      </ImageWrapper>
      {loading && <Loader />}
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
  justify-content: space-evenly;
  align-items: center;
`;

const FormGroup = styled.div`
  width: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 90%;
    font-size: 1rem;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
  align-self: start;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
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
  top: 2%;
  left: 66%;
  position: absolute;
  z-index: -100;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 250px;
    height: 250px;
    top: 33%;
    left: 77%;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
    height: 200px;
    top: -15%;
    left: 25%;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 150px;
    height: 150px;
    top: -6%;
    left: 25%;
  }
`;

export default PersonalDetails;
