import { StyledHomepage } from "../styles/Homepage.styled";
// import invoices from "../data.json";
import { Link, Outlet } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import dayjs from "dayjs";

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", currentUser.uid, "invoices")
        );
        querySnapshot.forEach((doc) => {
          // weird that we have access to doc.id but it isn't part of doc.data
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.uid]);

  return (
    <>
      <StyledHomepage>
        <header>
          <div className="invoice-container">
            <h1>Invoices</h1>
            <p>There are total invoices</p>
          </div>
          <div className="filter-container">
            <h3>Filter by status</h3>
            <select name="status-filter" id="">
              Status filter
            </select>
          </div>
          <div className="new-invoice-container">
            <img src="/assets/icon-plus.svg" alt="" />
            <Link to="/newInvoice">
              <button>New Invoice</button>
            </Link>
          </div>
        </header>
        <section className="invoices-container">
          {data.length > 0 &&
            data.map((item) => (
              <Link
                to={`${item.toData.clientName}/${item.id}`}
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
                <p>{item.itemList[0].total}</p>
                <div className="status-container">
                  <div className="circle"></div>
                  <p>{item.paymentTerms}</p>
                </div>
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
