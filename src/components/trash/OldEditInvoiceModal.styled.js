import styled from "styled-components";

export const StyledEditInvoiceModal = styled.div`
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
    border-radius: 0 20px 20px 0;
    h1 {
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
        .street-address {
          margin-bottom: 1.5rem;
          input {
            width: 100%;
          }
        }
        .from-address-subcontainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .city {
            input {
              width: 15.2rem;
            }
          }
          .post-code {
            input {
              width: 15.2rem;
            }
          }
          .country {
            input {
              width: 15.2rem;
            }
          }
        }
      }
    }
    .bill-to-container {
      .bill-to-parapgrah {
        color: ${(props) => props.theme.colors.cornflowerBlue};
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      .client-info-container {
        margin-bottom: 3rem;
        .client-name {
          input {
            width: 100%;
            margin-bottom: 1.5rem;
          }
        }
        .client-email {
          input {
            width: 100%;
            margin-bottom: 1.5rem;
          }
        }
        .client-street-address {
          margin-bottom: 1.5rem;
          input {
            width: 100%;
          }
        }
        .to-address-subcontainer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .to-city {
            input {
              width: 15.2rem;
            }
          }
          .to-post-code {
            input {
              width: 15.2rem;
            }
          }
          .to-country {
            input {
              width: 15.2rem;
            }
          }
        }
      }
      .invoice-info-container {
        margin-bottom: 2.5rem;
        .date-payment-terms-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          .mantine-date-picker {
            display: flex;
            flex-direction: column;
          }
          .payment-terms-container {
            display: flex;
            flex-direction: column;
            .payment-terms-select-box {
              display: flex;
              flex-direction: column;
              width: 24rem;
              cursor: pointer;
              .options-container {
                display: flex;
                flex-direction: column;
                width: 24rem;
                max-height: 0;
                opacity: 0;
                background-color: #c8c5c5;
                /* transition: all 0.4s; */
                border-radius: 8px;
                overflow: hidden;
                order: 1;
                .option {
                  width: 24rem;
                  padding: 1.55rem 2.4rem;
                  cursor: pointer;
                  :hover {
                    background-color: ${(props) =>
                      props.theme.colors.whisperBg};
                  }
                  .payment-terms-radio {
                    display: none;
                  }
                  label {
                    display: inline;
                    color: ${(props) => props.theme.colors.vulcan};
                    cursor: pointer;
                    :hover {
                      color: ${(props) => props.theme.colors.cornflowerBlue};
                    }
                  }
                }
              }
              .options-container.active {
                max-height: 19.1rem;
                opacity: 1;
              }
              .options-container.active + .selected::after {
                transform: rotateX(180deg);
                top: -2rem;
              }
              .selected {
                padding: 1.55rem 2.4rem;
                width: 24rem;
                border-radius: 8px;
                border: 1px solid ${(props) => props.theme.colors.selago};
                position: relative;
                order: 0;
                ::after {
                  content: "";
                  background-image: url("/assets/icon-arrow-down.svg");
                  background-size: contain;
                  background-repeat: no-repeat;
                  position: absolute;
                  height: 100%;
                  width: 1rem;
                  top: 2rem;
                  right: 1.4rem;
                  transition: 0.4s all;
                }
                :focus,
                :active {
                  border: 1px solid
                    ${(props) => props.theme.colors.cornflowerBlue};
                }
              }
              .selected.margin-bottom {
                margin-bottom: 2.4rem;
              }
            }
          }
        }
        .project-description-container {
          display: flex;
          flex-direction: column;
          input {
            width: 100%;
          }
        }
      }
    }
    .item-list-container {
      margin-bottom: 3.5rem;
      h2 {
        font-size: 1.8rem;
      }
      .item-list-input-table {
        margin-bottom: 2rem;
        .item-list-title-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .item-list-input-container {
          .item-list-input {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .delete-item-btn {
              cursor: pointer;
            }
          }
        }
      }
      .add-new-item-btn {
        background-color: #f9fafe;
        color: ${(props) => props.theme.colors.shipCove};
        width: 100%;
        :hover {
          background-color: #dfdfe0;
        }
      }
    }
    .new-invoice-btn-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.8rem;
      .cancel-btn {
        background-color: #f9fafe;
        color: ${(props) => props.theme.colors.shipCove};
        padding: 0 2.5rem;
      }
      .save-changes-btn {
        background-color: ${(props) => props.theme.colors.cornflowerBlue};
        color: #fff;
        padding: 0 2.5rem;
      }
    }
  }
`;
