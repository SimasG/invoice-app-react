import styled from "styled-components";

export const StyledAuthModal = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
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
      background: ${(props) => props.theme.colors.mirage};
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
        background: rgba(30, 33, 57, 0.75);
        transition: 0.2s;
      }
      span {
        color: #fff;
        font-size: 2rem;
      }
    }
    form {
      .email-input {
        margin-top: 3rem;
        outline: none;
        width: 100%;
        height: 5rem;
        border-radius: 8px;
        font-size: 1.6rem;
        padding: 1rem;
        font-family: "Roboto", sans-serif;
      }
    }
  }
`;
