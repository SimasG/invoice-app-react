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
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      h3 {
        cursor: pointer;
      }
      select {
        cursor: pointer;
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
