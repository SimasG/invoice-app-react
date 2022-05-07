import { StyledHomepage } from "../styles/Homepage.styled";
import { Link, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import useFetchInvoices from "../hooks/useFetchInvoices";

const Homepage = () => {
  const invoices = useFetchInvoices();

  const getTotal = (selectedItem) => {
    let total = 0;
    selectedItem.map((item) => {
      return (total += parseInt(item.total));
    });
    return total;
  };

  const openFilterOptions = () => {
    document
      .querySelector(".filter-option-container")
      .classList.toggle("active");
  };

  return (
    <>
      <StyledHomepage>
        <header>
          <div className="invoice-container">
            <h1>Invoices</h1>
            <p>There are total invoices</p>
          </div>
          <div className="filter-container">
            <div className="filter-title-container" onClick={openFilterOptions}>
              <h3>Filter by status</h3>
              <img src="/assets/icon-arrow-down.svg" alt="" />
            </div>
            <div className="filter-option-container">
              <div className="filter-option">
                <input type="checkbox" id="draft" />
                <label htmlFor="draft">Draft</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="pending" />
                <label htmlFor="pending">Pending</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="paid" />
                <label htmlFor="paid">Paid</label>
              </div>
            </div>
          </div>
          <div className="new-invoice-container">
            <img src="/assets/icon-plus.svg" alt="" />
            <Link to="/newInvoice">
              <button>New Invoice</button>
            </Link>
          </div>
        </header>
        <section className="invoices-container">
          {invoices.length > 0 &&
            invoices.map((item) => (
              <Link
                to={`/${item.toData.clientName}/${item.id}`}
                className="invoice-container"
                key={item.id}
              >
                <h3>
                  <span className="hashtag">#</span>
                  {item.id}
                </h3>
                <p>
                  Due{" "}
                  {dayjs.unix(item.invoiceDate.seconds).format("DD MMM YYYY")}
                </p>
                <p>{item.toData.clientName}</p>
                <p>
                  {getTotal(item.itemList).toLocaleString("en-US", {
                    style: "currency",
                    currency: "GBP",
                  })}
                </p>
                <p>{item.status}</p>
                <p>{item.paymentTerms}</p>
                <img src="/assets/icon-arrow-right.svg" alt="" />
              </Link>
            ))}

          {/* {data.map((item) => (
            <Link
              to={`${item.toData.clientName}/${item.id}`}
              className="invoice-container"
              key={item.id}
            >
              <h3>
                <span className="hashtag">#</span>
                {item.id}
              </h3>
              <p>Due {item.invoiceDate}</p>
              <p>{item.toData.clientName}</p>
              <p>{item.itemList[0].total}</p>
              <div className="status-container">
                <div className="circle"></div>
                <p>{item.paymentTerms}</p>
              </div>
              <img src="/assets/icon-arrow-right.svg" alt="" />
            </Link>
          ))} */}
          {/* {invoices.map((invoice) => (
            <Link
              to={`${invoice.clientName}/${invoice.id}`}
              className="invoice-container"
              key={invoice.id}
            >
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
            </Link>
          ))} */}
        </section>
      </StyledHomepage>
      <Outlet />
    </>
  );
};

export default Homepage;
