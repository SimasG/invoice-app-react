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
      return (total += item.qty * item.price);
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
          <div className="filter-new-invoice-container">
            <div className="filter-subcontainer">
              <div
                className="filter-title-container"
                onClick={openFilterOptions}
              >
                <h4>Filter by status</h4>
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
            <Link to="/newInvoice" className="new-invoice-subcontainer">
              <div className="img-container">
                <img src="/assets/icon-plus.svg" alt="" />
              </div>
              <div className="new-invoice-link">
                <p>New Invoice</p>
              </div>
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
                to={`/${item.clientName}/${item.id}`}
                className="invoice-item"
                key={item.id}
              >
                <h4>
                  <span className="hashtag">#</span>
                  {item.id}
                </h4>
                <p>
                  Due{" "}
                  {dayjs
                    .unix(
                      item.invoiceDate.seconds +
                        parseInt(item.paymentTerms) * 24 * 60 * 60
                    )
                    .format("DD MMM YYYY")}
                </p>
                <p>{item.clientName}</p>
                <h3 className="total">
                  {getTotal(item.itemList).toLocaleString("en-US", {
                    style: "currency",
                    currency: "GBP",
                  })}
                </h3>
                {item.status === "Draft" && (
                  <div className="status-container light-gray-bg">
                    <div className="circle dark-gray-bg"></div>
                    <h4 className="status dark-gray">{item.status}</h4>
                  </div>
                )}
                {item.status === "Pending" && (
                  <div className="status-container light-orange-bg">
                    <div className="circle orange-bg"></div>
                    <h4 className="status orange">{item.status}</h4>
                  </div>
                )}
                {item.status === "Paid" && (
                  <div className="status-container light-green-bg">
                    <div className="circle green-bg"></div>
                    <h4 className="status green">{item.status}</h4>
                  </div>
                )}
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
