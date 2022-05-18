import { useContext, useEffect } from "react";
import { StyledInvoice } from "../styles/Invoice.styled";
import { Link, useParams, Outlet, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditInvoiceModal from "./modals/EditInvoiceModal";
import dayjs from "dayjs";
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useFetchInvoices from "../hooks/useFetchInvoices";

const Invoice = ({ data, setData }) => {
  const { currentUser } = useContext(AuthContext);
  const invoices = useFetchInvoices();
  let params = useParams();
  let navigate = useNavigate();

  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const selectedInvoice = getInvoice(params.id);

  useEffect(() => {
    if (!selectedInvoice) return;
    setData(selectedInvoice);
  }, [selectedInvoice, setData]);

  const deleteInvoice = async (id) => {
    const invoiceDocRef = doc(db, "users", currentUser.uid, "invoices", id);
    await deleteDoc(invoiceDocRef);
    toast.success("Invoice has been deleted!");
    navigate("/");
  };

  const getTotal = () => {
    if (selectedInvoice) {
      let total = 0;
      selectedInvoice.itemList.map((item) => {
        return (total += item.qty * item.price);
      });
      return total;
    }
  };

  // CRUD -> U: Updating main state in a db
  const handlePaidInvoice = async (id) => {
    const invoicesDocRef = doc(db, "users", currentUser.uid, "invoices", id);
    // Tbh, could also have done the same things with setDoc
    await updateDoc(invoicesDocRef, {
      ...data,
      status: "Paid",
      id: selectedInvoice.id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("New invoice created!");
    navigate("/");
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
                <p>{selectedInvoice.status}</p>
              </div>
            </div>
            <div className="invoice-control-subcontainer">
              <Link
                to={`/${selectedInvoice.clientName}/${selectedInvoice.id}/edit`}
                // onClick={() => setEditOpen(true)}
              >
                Edit
              </Link>
              <button onClick={() => deleteInvoice(selectedInvoice.id)}>
                Delete
              </button>
              <button onClick={() => handlePaidInvoice(selectedInvoice.id)}>
                Mark as Paid
              </button>
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
                <p>{selectedInvoice.fromStreetAddress}</p>
                <p>{selectedInvoice.fromCity}</p>
                <p>{selectedInvoice.fromPostCode}</p>
                <p>{selectedInvoice.fromCountry}</p>
              </div>
            </div>
            <div className="invoice-content-subcontainer-2">
              <div className="date-container">
                <div className="invoice-date-container">
                  <p>Invoice Date</p>
                  <h3>
                    {dayjs
                      .unix(selectedInvoice.invoiceDate.seconds)
                      .format("DD MMM YYYY")}
                  </h3>
                </div>
                <div className="payment-date-container">
                  <p>Payment Date</p>
                  <h3>
                    {dayjs
                      .unix(
                        selectedInvoice.invoiceDate.seconds +
                          parseInt(selectedInvoice.paymentTerms) * 24 * 60 * 60
                      )
                      .format("DD MMM YYYY")}
                  </h3>
                </div>
              </div>
              <div className="invoice-recipient-container">
                <p>Bill To</p>
                <h3>{selectedInvoice.clientName}</h3>
                <p>{selectedInvoice.toStreet}</p>
                <p>{selectedInvoice.toCity}</p>
                <p>{selectedInvoice.toPostCode}</p>
                <p>{selectedInvoice.toCountry}</p>
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
                          {parseInt(item.qty * item.price).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "GBP",
                            }
                          )}
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
      <Outlet />
    </>
  );
};

export default Invoice;
