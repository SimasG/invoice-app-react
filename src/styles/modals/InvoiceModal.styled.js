import styled from "styled-components";

export const StyledInvoiceModal = styled.div`
  height: 100vh;
  position: fixed;
  width: 100%;
  top: 0;
  left: 10.3rem;
  background-color: rgba(0, 0, 0, 0.2);
  .new-invoice-modal-container {
    background-color: #fff;
    width: 61.6rem;
    height: 100vh;
    padding: 5.6rem;
    overflow-y: scroll;
    .title {
      margin-bottom: 4rem;
      span {
        color: ${(props) => props.theme.colors.baliHai};
        font-size: 3.2rem;
      }
    }
    .bill-from-container {
      margin-bottom: 4rem;
      .bill-from-parapgrah {
        color: ${(props) => props.theme.colors.cornflowerBlue};
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      .from-address-container {
        display: flex;
        justify-content: space-between;
        align-items: start;
        flex-wrap: wrap;
        div:first-child {
          margin-bottom: 1.5rem;
          width: 100%;
          input {
            width: 100%;
          }
        }
        div {
          input {
            width: 15.2rem;
          }
        }
      }
    }
    .bill-to-container {
      margin-bottom: 2rem;
      .bill-to-parapgrah {
        color: ${(props) => props.theme.colors.cornflowerBlue};
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      .client-info-container {
        display: flex;
        justify-content: space-between;
        align-items: start;
        flex-wrap: wrap;
        margin-bottom: 3rem;
        div {
          margin-bottom: 1.5rem;
        }
        div:nth-child(-n + 3) {
          width: 100%;
          input {
            width: 100%;
          }
        }
        .short-input {
          width: 15.2rem;
        }
      }
      .invoice-info-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        .payment-terms-container {
          #paymentTerms {
            display: block;
            width: 24rem;
            height: 4.8rem;
            font-family: "Poppins", sans-serif;
            font-weight: 700;
            color: ${(props) => props.theme.colors.vulcan};
            border-radius: 4px;
          }
        }
      }
      .project-description-container {
        input {
          width: 100%;
        }
        p {
          color: ${(props) => props.theme.colors.burntSienna};
          font-size: 1rem;
        }
      }
    }
    .item-list-container {
      margin-bottom: 3.5rem;
      h2 {
        font-size: 1.8rem;
        color: #777f98;
      }
      .item-list-input-table {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
        .item-list-input-table-subcontainer {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 2.5rem;
          .item-list-label-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1.2rem;
            width: 100%;
            label {
              :nth-child(1) {
                width: 19.5rem;
              }
              :nth-child(2) {
                width: 4.6rem;
              }
              :nth-child(3) {
                width: 12rem;
              }
              :nth-child(4) {
                width: 10rem;
              }
            }
          }
          .item {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 1.2rem;
            width: 100%;
            margin-bottom: 0.5rem;
            div {
              :nth-child(1) {
                width: 19.5rem;
              }
              :nth-child(2) {
                width: 4.6rem;
              }
              :nth-child(3) {
                width: 10rem;
              }
              :nth-child(4) {
                width: 10rem;
              }
              label {
                width: 11rem;
              }
              .item-name-input {
                width: 19.5rem;
              }
              .qty-input {
                width: 4.6rem;
                padding: 0 0.6rem;
                text-align: center;
              }
              .price-input {
                width: 10rem;
              }
              .total-input {
                width: 10rem;
                border: none;
                background-color: #fff;
              }
              p {
                color: ${(props) => props.theme.colors.burntSienna};
                font-size: 1rem;
              }
            }
            svg {
              align-self: center;
              cursor: pointer;
              path {
                :hover {
                  fill: ${(props) => props.theme.colors.burntSienna};
                }
              }
            }
          }
        }
        .add-new-item-btn {
          background-color: #f9fafe;
          color: ${(props) => props.theme.colors.shipCove};
          width: 100%;
          :hover {
            background-color: ${(props) => props.theme.colors.selago};
          }
        }
      }
    }
    .new-invoice-btn-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .discard-btn {
        background-color: #f9fafe;
        color: ${(props) => props.theme.colors.shipCove};
        padding: 0 2.5rem;
        :hover {
          background-color: ${(props) => props.theme.colors.selago};
        }
      }
      .save-btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        .save-draft-btn {
          background-color: #373b53;
          color: ${(props) => props.theme.colors.baliHai};
          padding: 0 2.5rem;
          :disabled {
            background-color: rgba(136, 142, 176, 0.5);
          }
          :hover {
            background-color: rgba(55, 59, 83, 0.75);
          }
        }
        .save-send-btn {
          background-color: ${(props) => props.theme.colors.cornflowerBlue};
          color: #fff;
          padding: 0 2.5rem;
          :disabled {
            background-color: rgba(124, 93, 250, 0.5);
          }
          :hover {
            background-color: ${(props) => props.theme.colors.heliotrope};
          }
        }
      }
    }
    .edit-invoice-btn-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;
      .cancel-btn {
        background-color: #f9fafe;
        color: ${(props) => props.theme.colors.shipCove};
        padding: 0 2.5rem;
        :hover {
          background-color: ${(props) => props.theme.colors.selago};
        }
      }
      .save-changes-btn {
        background-color: ${(props) => props.theme.colors.cornflowerBlue};
        color: #fff;
        padding: 0 2.5rem;
        :disabled {
          background-color: rgba(124, 93, 250, 0.5);
        }
        :hover {
          background-color: ${(props) => props.theme.colors.heliotrope};
        }
      }
    }
  }

  /* Side stuff */
  label {
    padding: 0.75rem 0;
  }
  input {
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.colors.vulcan};
    font-weight: 700;
    letter-spacing: 0.25px;
  }
  .error-msg {
    color: ${(props) => props.theme.colors.burntSienna};
    font-size: 1rem;
    margin-top: 0.75rem;
  }
  /* Mantine styling */
  .mantine-DatePicker-input {
    height: 4.8rem;
  }
  .mantine-DatePicker-dropdown {
    height: 32rem;
  }
`;
