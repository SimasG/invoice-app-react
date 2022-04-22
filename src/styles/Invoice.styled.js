import styled from "styled-components";

export const StyledInvoice = styled.main`
  width: 73rem;
  margin: 6rem auto 5.4rem auto;
  .back-btn {
    margin-bottom: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    padding: 0 2.5rem;

    font-size: 1.2rem;
    height: 4.8rem;
    width: fit-content;
    border-radius: 24px;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: -0.025rem;
    :hover {
      background-color: ${(props) => props.theme.colors.selago};
    }
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
    .price-container {
      table {
        width: 100%;
        background-color: #d5d5d5;
        /* F9FAFE */
        border-radius: 8px;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
          tr {
            .item-name-title {
              text-align: left;
              padding-left: 3.2rem;
            }
            .quantity-title {
              text-align: right;
            }
            .price-title {
              text-align: right;
            }
            .total-item-title {
              text-align: right;
              padding-right: 3.2rem;
            }
            th {
              padding: 3.2rem 0 1.15rem 0;
              color: ${(props) => props.theme.colors.shipCove};
              font-size: 1.1rem;
              line-height: 1.8rem;
              letter-spacing: -0.023rem;
              font-weight: 500;
            }
          }
        }
        tbody {
          tr {
            .item-name {
              padding-left: 3.2rem;
            }
            .quantity {
              text-align: right;
              padding-left: 8.2rem;
            }
            .price {
              text-align: right;
              padding-left: 1.5rem;
            }
            .total-item {
              text-align: right;
              padding-right: 3.2rem;
            }
            td {
              padding: 1.15rem 0;
              color: ${(props) => props.theme.colors.shipCove};
              font-size: 1.2rem;
              font-weight: 700;
              line-height: 1.5rem;
              letter-spacing: -0.025rem;
            }
            .dark {
              color: ${(props) => props.theme.colors.vulcan};
            }
          }
        }
        tfoot {
          color: #fff;
          background-color: #373b53;
          border-radius: 8px;
          tr {
            border-radius: 8px;
            .amount-due {
              border-radius: 0 0 0 8px;
            }
            .total {
              text-align: right;
              border-radius: 0 0 8px 0;
              font-size: 2.4rem;
              line-height: 3.2rem;
              letter-spacing: -0.05rem;
              font-weight: 700;
            }
            td {
              padding: 2.4rem 3.2rem;
            }
          }
        }
      }
    }
  }
`;
