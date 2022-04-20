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
    background-color: ${(props) => props.theme.colors.cornflowerBlue};
    padding: 3.75rem;
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
