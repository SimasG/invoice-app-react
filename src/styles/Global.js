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
    font-family: 'League Spartan', sans-serif;    
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
    font-family: 'League Spartan', sans-serif;
}

button {
    font-size: 1.2rem;
    height: 4.8rem;
    border-radius: 24px;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: -0.025rem;
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

label {
    display: block;
}

input {
    outline: none;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.selago};
    :focus {
        border: 1px solid ${(props) => props.theme.colors.cornflowerBlue};
    }
}

ul, li, button {
    cursor: pointer;
}
`;

export default GlobalStyles;
