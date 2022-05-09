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
    .filter-container {
      cursor: pointer;
      width: 19.2rem;
      .filter-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 11.8rem;
        margin: 0 auto;
        h3 {
          cursor: pointer;
        }
      }
      .filter-option-container {
        background-color: #fff;
        padding: 2rem;
        border-radius: 8px;
        position: fixed;
        width: 19.2rem;
        display: none;
        .filter-option {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0 1rem 0;
          cursor: pointer;
          :hover {
            background-color: ${(props) => props.theme.colors.baliHai};
          }
          input {
            cursor: pointer;
          }
          label {
            cursor: pointer;
          }
        }
      }
      .filter-option-container.active {
        display: block;
      }
    }
    .new-invoice-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      /* background-color: ${(props) => props.theme.colors.cornflowerBlue}; */
    }
  }
  .invoices-container {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    .invoice-container {
      background: #fff;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.4rem 3.2rem;
      h3 {
        .hashtag {
          color: ${(props) => props.theme.colors.cornflowerBlue};
        }
      }
    }
  }
`;
