import styled from "styled-components";

export const StyledHomepage = styled.main`
  width: 73rem;
  margin: 7rem auto 0 auto;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6.5rem;
    .invoice-container {
    }
    .filter-new-invoice-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .filter-subcontainer {
        cursor: pointer;
        width: 19.2rem;
        .filter-title-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 13rem;
          margin: 0 auto;
          height: 4.8rem;
          border-radius: 24px;
          padding: 0 1rem;
          :hover {
            /* background-color: #fff; */
            box-shadow: 0px 2px 12px -8px ${(props) => props.theme.colors.cornflowerBlue};
          }
          h3 {
            cursor: pointer;
          }
        }
        .filter-option-container {
          background-color: #fff;
          padding: 1.7rem 2.4rem;
          border-radius: 8px;
          position: fixed;
          width: 19.2rem;
          display: none;
          box-shadow: 0px 2px 12px -10px ${(props) => props.theme.colors.cornflowerBlue};
          .filter-option {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            height: 3.15rem;
            cursor: pointer;
            label {
              color: ${(props) => props.theme.colors.mirage};
              font-size: 1.2rem;
              font-weight: 700;
              cursor: pointer;
            }
            input {
              height: 1.2rem;
              cursor: pointer;
            }
          }
        }
        .filter-option-container.active {
          display: block;
        }
      }
      .new-invoice-subcontainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        background-color: ${(props) => props.theme.colors.cornflowerBlue};
        padding: 0.8rem 1.6rem 0.8rem 0.8rem;
        border-radius: 24px;
        width: 15rem;
        :hover {
          background-color: ${(props) => props.theme.colors.heliotrope};
        }
        .img-container {
          background-color: #fff;
          border-radius: 90px;
          height: 3.2rem;
          width: 3.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .new-invoice-link {
          p {
            color: #fff;
            font-size: 1.2rem;
            font-weight: 400;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
  .invoices-container {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    .invoice-item {
      background: #fff;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem 3.2rem;
      box-shadow: 0px 2px 12px -10px ${(props) => props.theme.colors.cornflowerBlue};
      :hover {
        box-shadow: 0px 2px 12px -7px ${(props) => props.theme.colors.cornflowerBlue};
      }
      h4 {
        .hashtag {
          color: ${(props) => props.theme.colors.shipCove};
        }
      }
      .total {
        letter-spacing: 0.5px;
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
    }
  }
`;
