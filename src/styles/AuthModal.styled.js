import styled from "styled-components";

export const StyledAuthModal = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: none;
  justify-content: center;
  align-items: center;
  .auth-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .auth-btn {
      padding: 1.5rem;
      border-radius: 8px;
      background: ${(props) => props.theme.colors.black4};
      font-size: 2rem;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      width: 25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      color: #fff;
      :hover {
        background: ${(props) => props.theme.colors.black3};
        transition: 0.2s;
      }
      span {
        color: #fff;
      }
    }
    .send-email-link-btn {
      display: none;
    }
    .email-input {
      margin-top: 3rem;
      outline: none;
      width: 100%;
      height: 5rem;
      border-radius: 8px;
      font-size: 1.6rem;
      padding: 1rem;
      font-family: "Roboto", sans-serif;
      display: none;
    }
  }
`;
