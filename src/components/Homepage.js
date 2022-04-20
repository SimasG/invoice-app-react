import { StyledHomepage } from "../styles/Homepage.styled";
import invoices from "../data.json";

const Homepage = () => {
  return (
    <StyledHomepage>
      <header>
        <div className="invoice-container">
          <h1>Invoices</h1>
          <p>There are x total invoices</p>
        </div>
        <div className="filter-container">
          <h3>Filter by status</h3>
          <select name="status-filter" id="">
            Status filter
          </select>
        </div>
        <div className="new-invoice-container">
          <img src="/assets/icon-plus.svg" alt="" />
          <p>New Invoice</p>
        </div>
      </header>
      <section className="invoices-container">
        {invoices.map((invoice) => (
          <div className="invoice-container">
            <h3>
              <span className="hashtag">#</span>
              {invoice.id}
            </h3>
            <p>Due {invoice.paymentDue}</p>
            <p>{invoice.clientName}</p>
            <p>{invoice.total}</p>
            <div className="status-container">
              <div className="circle"></div>
              <p>{invoice.status}</p>
            </div>
            <img src="/assets/icon-arrow-right.svg" alt="" />
          </div>
        ))}
      </section>
    </StyledHomepage>
  );
};

export default Homepage;
