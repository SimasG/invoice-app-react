import styled from "styled-components";

export const StyledDeleteInvoiceModal = styled.section`
  height: 100vh;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .delete-invoice-modal-container {
    background-color: #fff;
    width: 48rem;
    height: 24.9rem;
    padding: 4.8rem;
    border-radius: 8px;
    h2 {
      font-size: 2.4rem;
      margin-bottom: 1.5rem;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;
      .cancel-btn {
        color: ${(props) => props.theme.colors.shipCove};
        background-color: #f9fafe;
        padding: 0 2.5rem;
      }
      .delete-btn {
        color: #fff;
        background-color: ${(props) => props.theme.colors.burntSienna};
        padding: 0 2.5rem;
      }
    }
  }
`;
