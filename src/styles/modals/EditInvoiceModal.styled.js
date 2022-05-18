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
    overflow-y: scroll;
    .title {
      margin-bottom: 4rem;
      span {
        color: ${(props) => props.theme.colors.baliHai};
        font-size: 3.2rem;
      }
      .edit-heading-span {
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
        align-items: center;
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
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 3rem;
        div:nth-child(-n + 3) {
          width: 100%;
          input {
            width: 100%;
            margin-bottom: 1.5rem;
          }
        }
      }
      .invoice-info-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
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
        input {
          width: 100%;
        }
      }
    }
    .item-list-container {
      margin-bottom: 3.5rem;
      h2 {
        font-size: 1.8rem;
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
          margin-bottom: 0.5rem;
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 0.5rem;
            div {
              width: 11rem;
              label {
                width: 11rem;
              }
              input {
                width: 11rem;
              }
            }
            img {
              align-self: flex-end;
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
          background-color: ${(props) => props.theme.colors.selago};
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
        :hover {
          background-color: ${(props) => props.theme.colors.heliotrope};
        }
      }
    }
  }
`;
