import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${(props) => props.theme.bg.background};
    color: ${(props) => props.theme.text.primary};
    cursor: default;
  }
  *::-webkit-scrollbar{
    width: 12px;
    border-radius: 15px;
    background-color:transparent;
  }
  *::-webkit-scrollbar-track{
    border-radius: 15px;
    background-color: transparent;
  }
  *::-webkit-scrollbar-thumb{
    border-radius: 15px;
    background-color: ${(props) => props.theme.text.secondary};
  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }
`;

export default GlobalStyles;
