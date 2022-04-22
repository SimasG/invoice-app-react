import { useState } from "react";
import { StyledInvoice } from "../styles/Invoice.styled";
import invoices from "../data.json";
import { Link, useParams, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditInvoiceModal from "./EditInvoiceModal";

const Invoice = () => {
  const [editOpen, setEditOpen] = useState(false);
  console.log(`editOpen is ${editOpen}`);

  const params = useParams();
  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };
  const selectedInvoice = getInvoice(params.id);

  return (
    <>
      <StyledInvoice>
        <Link to="/" className="back-btn">
          <img src="/assets/icon-arrow-left.svg" alt="" />
          <h3>Go Back</h3>
        </Link>
        <section className="invoice-control-container">
          <div className="status-subcontainer">
            <p>Status</p>
            <div className="status">
              <p>{selectedInvoice.status}</p>
            </div>
          </div>
          <div className="invoice-control-subcontainer">
            <button
              // to={`/${selectedInvoice.clientName}/${selectedInvoice.id}/edit`}
              onClick={() => setEditOpen(true)}
            >
              Edit
            </button>
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
              <p>{selectedInvoice.senderAddress.street}</p>
              <p>{selectedInvoice.senderAddress.city}</p>
              <p>{selectedInvoice.senderAddress.postCode}</p>
              <p>{selectedInvoice.senderAddress.country}</p>
            </div>
          </div>
          <div className="invoice-content-subcontainer-2">
            <div className="date-container">
              <div className="invoice-date-container">
                <p>Invoice Date</p>
                <h3>{selectedInvoice.createdAt}</h3>
              </div>
              <div className="payment-date-container">
                <p>Payment Date</p>
                <h3>{selectedInvoice.paymentDue}</h3>
              </div>
            </div>
            <div className="invoice-recipient-container">
              <p>Bill To</p>
              <h3>{selectedInvoice.clientName}</h3>
              <p>{selectedInvoice.clientAddress.street}</p>
              <p>{selectedInvoice.clientAddress.city}</p>
              <p>{selectedInvoice.clientAddress.postCode}</p>
              <p>{selectedInvoice.clientAddress.country}</p>
            </div>
            <div className="invoice-recipient-email">
              <p>Sent to</p>
              <h3>{selectedInvoice.clientEmail}</h3>
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
                {selectedInvoice.items.map((item) => {
                  const uuid = uuidv4();
                  return (
                    <tr key={uuid}>
                      <td className="item-name dark">{item.name}</td>
                      <td className="quantity">{item.quantity}</td>
                      <td className="price">{item.price}</td>
                      <td className="total-item dark">{item.total}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="amount-due">Amount Due</td>
                  <td className="total" colSpan="3">
                    {selectedInvoice.total}
                  </td>
                </tr>
              </tfoot>
            </table>
            {/* <div className="total-amount-due-container">
            <p>Amount Due</p>
            <h1></h1>
          </div> */}
          </div>
        </section>
      </StyledInvoice>
      {editOpen && <EditInvoiceModal setEditOpen={setEditOpen} />}
      <Outlet />
    </>
  );
};

export default Invoice;
