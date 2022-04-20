import styled from "styled-components";

export const StyledInvoice = styled.main`
  width: 73rem;
  margin: 6rem auto 5.4rem auto;
  .back-btn {
    margin-bottom: 3.5rem;
  }
  .invoice-control-container {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3.65rem 3.2rem;
    border-radius: 8px;
    margin-bottom: 2.4rem;
    .status-subcontainer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.6rem;
    }
    .invoice-control-subcontainer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
    }
  }
  .invoice-content-container {
    background-color: #fff;
    padding: 4.8rem;
    border-radius: 8px;
    .invoice-content-subcontainer-1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      .description-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5rem;
        span {
          color: ${(props) => props.theme.colors.baliHai};
        }
      }
      .sender-address-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
      }
    }
    .invoice-content-subcontainer-2 {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 4.8rem;
      .date-container {
        margin-right: 10rem;
      }
      .invoice-recipient-container {
        margin-right: 12rem;
      }
      .invoice-recipient-email {
      }
    }
    .price-table {
      width: 100%;
      background-color: #f9fafe;
      border-radius: 8px;
      padding: 3.2rem;
    }
  }
`;
