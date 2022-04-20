import { StyledInvoice } from "../styles/Invoice.styled";
import invoices from "../data.json";

const Invoice = () => {
  return (
    <StyledInvoice>
      <button className="back-btn">
        <img src="/assets/icon-arrow-left" alt="" />
        <h3>Go Back</h3>
      </button>
      <section className="invoice-control-container">
        <div className="status-subcontainer">
          <p>Status</p>
          <div className="status">
            <p>{invoices[0].status}</p>
          </div>
        </div>
        <div className="invoice-control-subcontainer">
          <button>Edit</button>
          <button>Delete</button>
          <button>Mark as Paid</button>
        </div>
      </section>
      <section className="invoice-content-container">
        <div className="invoice-content-subcontainer-1">
          <div className="description-container">
            <h2>
              <span>#</span>
              {invoices[0].id}
            </h2>
            <p>{invoices[0].description}</p>
          </div>
          <div className="sender-address-container">
            <p>{invoices[0].senderAddress.street}</p>
            <p>{invoices[0].senderAddress.city}</p>
            <p>{invoices[0].senderAddress.postCode}</p>
            <p>{invoices[0].senderAddress.country}</p>
          </div>
        </div>
        <div className="invoice-content-subcontainer-2">
          <div className="date-container">
            <div className="invoice-date-container">
              <p>Invoice Date</p>
              <h3>{invoices[0].createdAt}</h3>
            </div>
            <div className="payment-date-container">
              <p>Payment Date</p>
              <h3>{invoices[0].paymentDue}</h3>
            </div>
          </div>
          <div className="invoice-recipient-container">
            <p>Bill To</p>
            <h3>{invoices[0].clientName}</h3>
            <p>{invoices[0].clientAddress.street}</p>
            <p>{invoices[0].clientAddress.city}</p>
            <p>{invoices[0].clientAddress.postCode}</p>
            <p>{invoices[0].clientAddress.country}</p>
          </div>
          <div className="invoice-recipient-email">
            <p>Sent to</p>
            <h3>{invoices[0].clientEmail}</h3>
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
              <tr>
                <td className="item-name dark">{invoices[0].items[0].name}</td>
                <td className="quantity">{invoices[0].items[0].quantity}</td>
                <td className="price">{invoices[0].items[0].price}</td>
                <td className="total-item dark">
                  {invoices[0].items[0].total}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="amount-due">Amount Due</td>
                <td className="total" colSpan="3">
                  {invoices[0].total}
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
  );
};

export default Invoice;
