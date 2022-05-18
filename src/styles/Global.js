import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border: none;
}

html {
    font-size: 62.5%;
    font-family: 'Poppins', sans-serif;    
    scroll-behavior: smooth;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.whisperBg}
}

body {
}

h1, h2, h3, h4, p, li, ul, span, a, button {
    list-style-type: none;
    text-decoration: none;
    background: none;
    font-family: 'Poppins', sans-serif;    
}

h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 3.6rem;
    letter-spacing: -1px;
    color: ${(props) => props.theme.colors.vulcan}
}

h2 {
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.2rem;
    letter-spacing: -0.63px;
    color: ${(props) => props.theme.colors.vulcan}
}

h3 {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.4rem;
    letter-spacing: -0.8px;
    color: ${(props) => props.theme.colors.vulcan}
}

h4 {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.5rem;
    letter-spacing: -0.25px;
    color: ${(props) => props.theme.colors.vulcan}
}

p, li, span, input, ul, a, label {
    font-size: 1.2rem;
    line-height: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.25px;
}

p {
    color: ${(props) => props.theme.colors.baliHai};
    line-height: 1.5rem;
    letter-spacing: -0.025rem;
    font-size: 1.2rem;
}

button {
    font-size: 1.2rem;
    height: 4.8rem;
    border-radius: 24px;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: -0.025rem;
}

label {
    display: block;
    color: ${(props) => props.theme.colors.shipCove};
}

input {
    outline: none;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.selago};
    height: 4.8rem;
    padding: 0 2.1rem;
    :focus {
        border: 1px solid ${(props) => props.theme.colors.cornflowerBlue};
    }
}

ul, li, button {
    cursor: pointer;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`;

export default GlobalStyles;
