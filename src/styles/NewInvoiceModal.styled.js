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
        .mantine-date-picker {
          width: 24rem;
          :focus {
            width: 24rem;
          }
        }
      }
    }
  }
`;
