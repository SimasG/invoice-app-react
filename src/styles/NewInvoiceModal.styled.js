import styled from "styled-components";

export const StyledNewInvoiceModal = styled.div`
  /* background-color: yellow; */
  height: 100vh;
  position: fixed;
  width: 100%;
  top: 0;
  left: 10.3rem;
  background-color: rgba(0, 0, 0, 0.2);
  .new-invoice-modal-container {
    background-color: yellow;
    width: 61.6rem;
    height: 100vh;
    padding: 5.6rem;
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
        display: flex;
        justify-content: center;
        align-items: center;
        .mantine-date-picker {
        }
        .payment-terms-container {
          .payment-terms-select-box {
            display: flex;
            flex-direction: column;
            width: 24rem;
            cursor: pointer;
            .options-container {
              max-height: 0;
              opacity: 0;
              background-color: #c8c5c5;
              /* transition: all 0.4s; */
              border-radius: 8px;
              overflow: hidden;
              order: 1;
              .option {
                padding: 1.55rem 2.4rem;
                cursor: pointer;
                :hover {
                  background-color: ${(props) => props.theme.colors.whisperBg};
                }
                .radio {
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
              border-radius: 8px;
              border: 1px solid ${(props) => props.theme.colors.selago};
              margin-bottom: 2.4rem;
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
          }
        }
      }
    }
  }
`;
