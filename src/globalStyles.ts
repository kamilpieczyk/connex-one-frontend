import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 body{
  background: rgb(63,94,251);
  background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  margin: 0;
 }

 *, *::after, *::before {
   box-sizing: border-box;
 }
`;

export default GlobalStyle;
