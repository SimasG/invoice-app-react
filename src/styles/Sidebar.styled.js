import styled from "styled-components";

export const StyledSidebar = styled.nav`
  background: #373b53;
  position: fixed;
  top: 0;
  left: 0;
  width: 10.3rem;
  height: 100vh;
  overflow-x: hidden;
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 2.4rem 0;
  .logo-container {
    cursor: pointer;
    .logo-subcontainer {
      background-color: ${(props) => props.theme.colors.cornflowerBlue};
      height: 10.3rem;
      width: 10.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      border-bottom-right-radius: 20px;
      img {
        height: 3.771rem;
        width: 4rem;
        z-index: 3;
      }
    }
    .logo-shadow {
      background-color: ${(props) => props.theme.colors.heliotrope};
      height: 5.15rem;
      width: 10.3rem;
      margin-top: -5.15rem;
      z-index: 2;
      border-bottom-right-radius: 20px;
      border-top-left-radius: 20px;
    }
  }
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: auto;
    cursor: pointer;
    border-radius: 8px;
    :hover {
      background-color: ${(props) => props.theme.colors.shipCove};
    }
    button {
      height: 6rem;
      width: 6rem;
      .login-icon {
        height: 3rem;
        width: 3rem;
        color: #fff;
      }
    }
    span {
      color: #fff;
    }
  }
  .logout-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: auto;
    cursor: pointer;
    border-radius: 8px;
    :hover {
      background-color: ${(props) => props.theme.colors.shipCove};
    }
    button {
      height: 6rem;
      width: 6rem;
      .logout-icon {
        height: 3rem;
        width: 3rem;
        color: #fff;
      }
    }
    span {
      color: #fff;
    }
  }
  div {
    .theme-toggle-container {
      .theme-toggle {
        margin: 0 3rem 3.2rem 3rem;
      }
    }
    .gray-line {
      width: 100%;
      height: 0.1rem;
      background-color: #494e6e;
    }
    .profile-pic {
      margin: 2.4rem 2rem 0 2rem;
      border-radius: 90px;
      height: 4rem;
      width: 4rem;
    }
  }
`;
