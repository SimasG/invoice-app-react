import { StyledNewInvoiceModal } from "../styles/modals/EditInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import {
  fromAddressInputs,
  toAddressinputs,
  paymentTermsInputs,
} from "../formSource";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { InvoicesContext } from "../contexts/InvoicesContext";
import dayjs from "dayjs";

const itemListInputs = [
  {
    id: "itemName",
    label: "Item Name",
    type: "text",
    placeholder: "Item Name",
  },
  {
    id: "qty",
    label: "Qty.",
    type: "number",
    placeholder: "Qty.",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "Price",
  },
  {
    id: "total",
    label: "Total",
    type: "number",
    placeholder: "Total",
  },
];

// TODO: Ensure every value is captured when updating (currently missing last updated letter) -> WIP
// TODO: Make sure changes are reflected in the frontend -> DONE
// TODO: Make sure the specific doc is updated and not a clone of it created -> DONE

const NewInvoiceModal = () => {
  // Why am I importing currentUser in an object again?
  const { currentUser } = useContext(AuthContext);
  const invoices = useContext(InvoicesContext);
  let navigate = useNavigate();

  const params = useParams();

  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const selectedInvoice = getInvoice(params.id);

  // Sub-states
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [paymentTerms, setPaymentTerms] = useState();
  const [description, setDescription] = useState();
  const [itemList, setItemList] = useState([
    {
      uid: uuidv4(),
      itemName: "",
      price: 0,
      qty: 0,
      total: 0,
    },
  ]);

  // Main state
  const [data, setData] = useState();

  //   Populating the sub-states with selected invoice data
  useEffect(() => {
    if (!selectedInvoice) return;
    setFromData(selectedInvoice.fromData);
    setToData(selectedInvoice.toData);
    setInvoiceDate({
      invoiceDate: new Date(
        dayjs.unix(selectedInvoice.invoiceDate.seconds).format("DD-MMM-YYYY")
      ),
    });
    setPaymentTerms({ paymentTerms: selectedInvoice.paymentTerms });
    setDescription({ description: selectedInvoice.description });
    setItemList(selectedInvoice.itemList);
    setData(selectedInvoice);
  }, [selectedInvoice]);

  // AGGREGATING SUB-STATES INTO MAIN STATE
  const handleSetData = () => {
    setData({
      fromData: { ...fromData },
      toData: { ...toData },
      ...invoiceDate,
      ...paymentTerms,
      ...description,
      itemList,
    });
  };

  //   Adding event listeners to each paymentTerms option
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML =
        option.querySelector("label").innerHTML;
      document.querySelector(".options-container").classList.remove("active");
    });
  });

  const handleSelectedPaymentTermBtn = () => {
    document.querySelector(".options-container").classList.toggle("active");
    if (
      document.querySelector(".options-container").classList.contains("active")
    ) {
      document.querySelector(".selected").classList.add("margin-bottom");
    } else {
      document.querySelector(".selected").classList.remove("margin-bottom");
    }
  };

  // HANDLING DIFFERENT INPUTS
  const handleFromInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    // Interesting "[id]" syntax. Instead of specifying a new key with the name of "id" (in the case of "id: value"),
    // it takes the id of the currently active element and assigns the onChange value to it.
    setFromData({ ...fromData, [id]: value });
    handleSetData();
  };

  const handleToInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setToData({ ...toData, [id]: value });
    handleSetData();
  };

  const handleInvoiceDateInput = (e) => {
    setInvoiceDate({ invoiceDate: e });
    handleSetData();
  };

  const handlePaymentTermInput = (e) => {
    setPaymentTerms({ paymentTerms: e.target.innerText });
    handleSetData();
  };

  const handleDescriptionInput = (e) => {
    setDescription({ description: e.target.value });
    handleSetData();
  };

  // HANDLING ADDING & DELETING NEW ITEMS
  const handleAddNewItem = () => {
    const updatedItemList = [
      ...itemList,
      {
        uid: uuidv4(),
        itemName: "",
        price: 0,
        qty: 0,
        total: 0,
      },
    ];
    setItemList(updatedItemList);
  };

  const handleDeleteItem = (uid) => {
    setItemList(itemList.filter((item) => uid !== item.uid));
    toast.success("Item deleted");
  };

  // CRUD -> U: Updating main state in a db
  const handleUpdateInvoice = async (id) => {
    const invoicesDocRef = doc(db, "users", currentUser.uid, "invoices", id);
    // Tbh, could also have done the same things with setDoc
    await updateDoc(invoicesDocRef, {
      ...data,
      id: selectedInvoice.id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("New invoice created!");
    navigate("/");
  };

  // Counter for mapped items (cancer)
  let n = 0;
  let m = -1;

  return (
    <>
      {selectedInvoice && (
        <StyledNewInvoiceModal
          className="new-invoice-modal-overlay"
          onClick={() => navigate(-1)}
        >
          <main
            className="new-invoice-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Edit Invoice</h1>
            <section className="bill-from-container">
              <p className="bill-from-parapgrah">Bill From</p>
              <div className="from-address-container">
                {/* Weird that I have that "fromData" doesn't change immediately once "selectedInvoice" is fetched */}
                {fromData &&
                  fromAddressInputs.map((input) => (
                    <div key={input.id}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        id={input.id}
                        value={fromData[input.id]}
                        onChange={handleFromInput}
                      />
                    </div>
                  ))}
              </div>
            </section>
            <section className="bill-to-container">
              <p className="bill-to-parapgrah">Bill To</p>
              <div className="client-info-container">
                {toData &&
                  toAddressinputs.map((input) => (
                    <div key={input.id}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        id={input.id}
                        value={toData[input.id]}
                        onChange={handleToInput}
                      />
                    </div>
                  ))}
              </div>
              {invoiceDate && (
                <div className="invoice-info-container">
                  <DatePicker
                    styles={{
                      wrapper: {
                        width: "24rem",
                      },
                      calendarHeader: {
                        width: "22rem",
                      },
                      month: {
                        width: "21.5rem",
                      },
                      dropdown: {
                        width: "24rem",
                      },
                      arrow: {
                        color: "green",
                      },
                    }}
                    className="mantine-date-picker"
                    placeholder="Pick date"
                    label="Invoice date"
                    id="invoice-date"
                    value={invoiceDate.invoiceDate}
                    onChange={handleInvoiceDateInput}
                  />
                  <div className="payment-terms-container">
                    <label>Payment Terms</label>
                    <div className="payment-terms-select-box">
                      <div className="options-container">
                        {paymentTerms &&
                          paymentTermsInputs.map((input) => (
                            <div
                              className="option"
                              key={input.id}
                              onClick={handlePaymentTermInput}
                            >
                              <input
                                type={input.type}
                                className={input.className}
                                id={input.id}
                                name={input.name}
                              />
                              <label htmlFor={input.id}>{input.label}</label>
                            </div>
                          ))}
                      </div>
                      <div
                        className="selected"
                        onClick={() => handleSelectedPaymentTermBtn()}
                      >
                        <h4>{paymentTerms.paymentTerms}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="project-description-container">
                <label>Project Description</label>
                {description && (
                  <input
                    type="text"
                    placeholder="Project Description"
                    value={description.description}
                    onChange={handleDescriptionInput}
                  />
                )}
              </div>
            </section>
            <section className="item-list-container">
              <h2>Item List</h2>
              <div className="item-list-input-table">
                <div className="item-list-input-table-subcontainer">
                  {itemList.map((item) => {
                    // PURE CANCER
                    n += 1;
                    m += 1;
                    return (
                      <div className="item" key={item.uid}>
                        {/* Recreated "itemListInputs" array in this file cuz wasn't able to access it from "formSource.js" for some reason */}
                        {/* Ideally would not write logic in JSX but had trouble accessing multiple arguments in the callback otherwise */}
                        {itemListInputs.map((input) => (
                          <div key={input.id}>
                            {n <= 1 && <label>{input.label}</label>}
                            <input
                              type={input.type}
                              placeholder={input.placeholder}
                              id={input.id}
                              // Handle updating items
                              value={itemList[m][input.id]}
                              onChange={(e) => {
                                setItemList(
                                  itemList.map((i) =>
                                    i.uid === item.uid
                                      ? { ...i, [input.id]: e.target.value }
                                      : i
                                  )
                                );
                                handleSetData();
                              }}
                            />
                          </div>
                        ))}
                        <img
                          src="/assets/icon-delete.svg"
                          alt="delete item"
                          onClick={() => handleDeleteItem(item.uid)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="add-new-item-btn" onClick={handleAddNewItem}>
                + Add New Item
              </button>
            </section>
            <section className="new-invoice-btn-container">
              <button className="discard-btn" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <div className="save-btn-container">
                <button
                  onClick={() => handleUpdateInvoice(selectedInvoice.id)}
                  className="save-send-btn"
                >
                  Save Changes
                </button>
              </div>
            </section>
          </main>
        </StyledNewInvoiceModal>
      )}
    </>
  );
};

export default NewInvoiceModal;
