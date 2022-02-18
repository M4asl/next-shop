import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { parseCookies } from "nookies";
import styled from "styled-components";
import { lightTheme } from "../styles/default";
import { wrapper } from "../redux/store";
import { register } from "../redux/actions/authActions";
import Loader from "../components/Layout/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(values.email, values.password, values.passwordConfirm));
  };

  return (
    <RegisterWrapper>
      <GlassCard>
        <FormContainer onSubmit={handleSubmit}>
          <TextTitle>Sign up</TextTitle>
          <FormGroup>
            <Label htmlFor="email_field">Email</Label>
            <StyledInput
              type="email"
              placeholder="Email"
              id="email_field"
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password_field">Password</Label>
            <StyledInput
              type="password"
              placeholder="Password"
              id="password_field"
              value={values.password}
              onChange={handleChange("password")}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password_confirm_field">Confirm password</Label>
            <StyledInput
              type="password"
              placeholder="Confirm password"
              id="password_confirm_field"
              value={values.passwordConfirm}
              onChange={handleChange("passwordConfirm")}
            />
          </FormGroup>

          <Button
            id="register_button"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Loader /> : "REGISTER"}
          </Button>
          <LinkContainer>
            <Link href="/login">Already have an account?</Link>
          </LinkContainer>
        </FormContainer>
      </GlassCard>
    </RegisterWrapper>
  );
};

const LinkContainer = styled.span`
  a {
    color: ${({ theme }) => theme.text.primary};
  }
`;

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const TextTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
`;

const GlassCard = styled.div`
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  z-index: 1;
  width: 550px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media only ${lightTheme.breakpoints.md} {
    width: 500px;
    height: 550px;
  }
  @media only ${lightTheme.breakpoints.sm} {
    margin-top: 50px;
    width: 400px;
    height: 500px;
  }
  @media only ${lightTheme.breakpoints.xs} {
    width: 300px;
    height: 500px;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 4.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 2rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.text.primary};
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.primary};
    font-weight: 100;
    font-size: 2rem;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FormGroup = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 180px;
  height: 35px;
  margin: 20px 0px;
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const { token } = await parseCookies({ req });
      if (token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: {},
      };
    }
);

export default Register;
