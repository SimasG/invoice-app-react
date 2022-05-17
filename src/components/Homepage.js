import { StyledHomepage } from "../styles/Homepage.styled";
import { Link, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import useFetchInvoices from "../hooks/useFetchInvoices";
import { useEffect, useState } from "react";
import { statusFilterInputs } from "../formSource";

const Homepage = () => {
  const [checkedState, setCheckedState] = useState([
    "Draft",
    "Pending",
    "Paid",
  ]);
  const [data, setData] = useState([]);

  const invoices = useFetchInvoices();

  useEffect(() => {
    if (!invoices) return;
    setData(invoices);
  }, [invoices]);

  const handleCheckedState = (position, status) => {
    const currentIndex = checkedState.indexOf(status);
    const newCheckedState = [...checkedState];

    if (currentIndex === -1) {
      newCheckedState.push(status);
    } else {
      newCheckedState.splice(currentIndex, 1);
    }

    setCheckedState(newCheckedState);
  };

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

  const countInvoices = () => {
    let sum = 0;
    data.filter((item) => {
      if (checkedState.includes(item.status)) {
        sum += 1;
      }
      // Why does the .filter method expect a return value here?
      return sum;
    });
    return sum;
  };

  return (
    <>
      <StyledHomepage>
        <header>
          <div className="invoice-container">
            <h1>Invoices</h1>
            {countInvoices() > 1 && (
              <p>There are {countInvoices()} total invoices</p>
            )}
            {countInvoices() === 1 && (
              <p>There is {countInvoices()} total invoice</p>
            )}
            {countInvoices() === 0 && <p>No invoices</p>}
          </div>
          <div className="filter-container">
            <div className="filter-title-container" onClick={openFilterOptions}>
              <h3>Filter by status</h3>
              <img src="/assets/icon-arrow-down.svg" alt="" />
            </div>
            <div className="filter-option-container">
              {statusFilterInputs.map((input) => {
                const { id, index, status } = input;
                return (
                  <div className="filter-option" key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      value={status}
                      checked={
                        checkedState.indexOf(status) === -1 ? false : true
                      }
                      onChange={() => handleCheckedState(index, status)}
                    />
                    <label htmlFor="draft">{status}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="new-invoice-container">
            <div className="img-container">
              <img src="/assets/icon-plus.svg" alt="" />
            </div>
            <Link className="new-invoice-link" to="/newInvoice">
              <p>New Invoice</p>
            </Link>
          </div>
        </header>
        <section className="invoices-container">
          {data
            .filter((item) => {
              return checkedState.includes(item.status);
            })
            .map((item) => (
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
        </section>
      </StyledHomepage>
      <Outlet />
    </>
  );
};

export default Homepage;
