import React from "react";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? (
        <IconContext.Provider value={{ size: "1em" }}>
          <FaMoon />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ size: "1em" }}>
          <FaSun />
        </IconContext.Provider>
      )}
    </Button>
  );
};

const Button = styled.button`
  background: ${({ theme }) => theme.bg.background};
  border: 2px solid ${({ theme }) => theme.bg.colorBorder};
  color: ${({ theme }) => theme.text.primary};
  border-radius: 50%;
  cursor: pointer;
  // font-size: 2rem;
  padding: 0.8rem;
  margin: 0.8rem;
  position: fixed;
  z-index: 100;
  top: 90%;
  left: 95%;
  display: flex;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    left: 90%;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    top: 88%;
    left: 80%;
  }
`;

export default Toggle;
