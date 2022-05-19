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
    h4 {
      :hover {
        color: ${(props) => props.theme.colors.shipCove};
      }
    }
    :hover {
      h4 {
        color: ${(props) => props.theme.colors.shipCove};
      }
    }
  }
  .invoice-control-container {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3.2rem;
    border-radius: 8px;
    margin-bottom: 2.4rem;
    .status-subcontainer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.6rem;
    }
    .status-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      width: 10.8rem;
      height: 4rem;
      border-radius: 6px;
      .circle {
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 90px;
      }
    }
    .invoice-control-subcontainer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      .edit-link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.8rem;
        width: 7.3rem;
        background-color: #f9fafe;
        border-radius: 24px;
        :hover {
          background-color: ${(props) => props.theme.colors.selago};
        }
        button {
          font-size: 1.2rem;
          color: ${(props) => props.theme.colors.shipCove};
          font-weight: 700;
        }
      }
      button {
        border-radius: 24px;
        color: #fff;
      }
      .delete-btn {
        background-color: ${(props) => props.theme.colors.burntSienna};
        width: 8.9rem;
        :hover {
          background-color: #ff9797;
        }
      }
      .mark-paid-btn {
        background-color: ${(props) => props.theme.colors.cornflowerBlue};
        width: 13.1rem;
        :hover {
          background-color: ${(props) => props.theme.colors.heliotrope};
        }
      }
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
          font-size: 1.6rem;
        }
      }
      .sender-address-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        p {
          font-size: 1.1rem;
        }
      }
    }
    .invoice-content-subcontainer-2 {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 4.8rem;
      .date-container {
        margin-right: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        div {
          p {
            margin-bottom: 0.5rem;
          }
        }
      }
      .invoice-recipient-container {
        margin-right: 8rem;
        .bill-to {
          margin-bottom: 0.5rem;
        }
        h3 {
          margin-bottom: 0.5rem;
        }
      }
      .invoice-recipient-email {
      }
    }
    .price-container {
      table {
        width: 100%;
        background-color: #f9fafe;
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
              font-weight: 400;
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

  /* Invoice-specific stuff */
  p {
    color: #858bb2;
    line-height: 1.8rem;
  }
  h3 {
    font-size: 1.5rem;
  }
`;
