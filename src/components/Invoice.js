import { useContext, useState } from "react";
import { StyledInvoice } from "../styles/Invoice.styled";
// import invoices from "../data.json";
import { Link, useParams, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditInvoiceModal from "./EditInvoiceModal";
import { InvoicesContext } from "../contexts/InvoicesContext";
import dayjs from "dayjs";

const Invoice = () => {
  const [editOpen, setEditOpen] = useState(false);
  const invoices = useContext(InvoicesContext);
  let params = useParams();

  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };
  const selectedInvoice = getInvoice(params.id);

  const getTotal = () => {
    if (selectedInvoice) {
      let total = 0;
      selectedInvoice.itemList.map((item) => {
        return (total += parseInt(item.total));
      });
      return total;
    }
  };

  return (
    <>
      {selectedInvoice && (
        <StyledInvoice>
          <Link to="/" className="back-btn">
            <img src="/assets/icon-arrow-left.svg" alt="" />
            <h3>Go Back</h3>
          </Link>
          <section className="invoice-control-container">
            <div className="status-subcontainer">
              <p>Status</p>
              <div className="status">
                <p>status</p>
              </div>
            </div>
            <div className="invoice-control-subcontainer">
              <Link
                to={`/${selectedInvoice.toData.clientName}/${selectedInvoice.id}/edit`}
                // onClick={() => setEditOpen(true)}
              >
                Edit
              </Link>
              <button>Delete</button>
              <button>Mark as Paid</button>
            </div>
          </section>
          <section className="invoice-content-container">
            <div className="invoice-content-subcontainer-1">
              <div className="description-container">
                <h2>
                  <span>#</span>
                  {selectedInvoice.id}
                </h2>
                <p>{selectedInvoice.description}</p>
              </div>
              <div className="sender-address-container">
                <p>{selectedInvoice.fromData.street}</p>
                <p>{selectedInvoice.fromData.city}</p>
                <p>{selectedInvoice.fromData.postCode}</p>
                <p>{selectedInvoice.fromData.country}</p>
              </div>
            </div>
            <div className="invoice-content-subcontainer-2">
              <div className="date-container">
                <div className="invoice-date-container">
                  <p>Invoice Date</p>
                  <h3>
                    {" "}
                    {dayjs
                      .unix(selectedInvoice.invoiceDate.seconds)
                      .format("DD MMM YYYY")}
                  </h3>
                </div>
                <div className="payment-date-container">
                  <p>Payment Date</p>
                  <h3>{selectedInvoice.paymentTerms}</h3>
                </div>
              </div>
              <div className="invoice-recipient-container">
                <p>Bill To</p>
                <h3>{selectedInvoice.toData.clientName}</h3>
                <p>{selectedInvoice.toData.street}</p>
                <p>{selectedInvoice.toData.city}</p>
                <p>{selectedInvoice.toData.postCode}</p>
                <p>{selectedInvoice.toData.country}</p>
              </div>
              <div className="invoice-recipient-email">
                <p>Sent to</p>
                <h3>{selectedInvoice.toData.clientEmail}</h3>
              </div>
            </div>
            <div className="price-container">
              <table>
                <thead>
                  <tr>
                    <th className="item-name-title">Item Name</th>
                    <th className="quantity-title">QTY.</th>
                    <th className="price-title">Price</th>
                    <th className="total-item-title">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.itemList.map((item) => {
                    const uuid = uuidv4();
                    return (
                      <tr key={uuid}>
                        <td className="item-name dark">{item.itemName}</td>
                        <td className="quantity">{item.qty}</td>
                        <td className="price">
                          {parseInt(item.price).toLocaleString("en-US", {
                            style: "currency",
                            currency: "GBP",
                          })}
                        </td>
                        <td className="total-item dark">
                          {parseInt(item.total).toLocaleString("en-US", {
                            style: "currency",
                            currency: "GBP",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="amount-due">Amount Due</td>
                    <td className="total" colSpan="3">
                      {getTotal().toLocaleString("en-US", {
                        style: "currency",
                        currency: "GBP",
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </StyledInvoice>
      )}
      {/* {editOpen && (
        <EditInvoiceModal
          setEditOpen={setEditOpen}
          // selectedInvoice={selectedInvoice}
        />
      )} */}
      <Outlet />
    </>
  );
};

export default Invoice;
