import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { parseCookies } from "nookies";
import styled from "styled-components";
import { lightTheme } from "../styles/default";
import { wrapper } from "../redux/store";
import { login } from "../redux/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  return (
    <LoginWrapper>
      <GlassCard>
        <FormContainer onSubmit={handleSubmit}>
          <h1>Sign in</h1>
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
          <LinkContainer>
            <Link href="/password/forgot">Forgot password?</Link>
          </LinkContainer>

          <button
            id="login_button"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? "LOADING" : "LOGIN"}
          </button>
          <LinkContainer>
            <Link href="/register">Create acount</Link>
          </LinkContainer>
        </FormContainer>
      </GlassCard>
    </LoginWrapper>
  );
};

const LinkContainer = styled.span`
  a {
    color: ${({ theme }) => theme.text.primary};
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
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
  backdrop-filter: blur(9px) saturate(200%);
  -webkit-backdrop-filter: blur(9px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.31);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
    height: 400px;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.31);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 4.5rem;
  padding: 1rem;
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

export default Login;
