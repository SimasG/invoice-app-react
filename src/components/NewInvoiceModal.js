import { StyledNewInvoiceModal } from "../styles/NewInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import {
  fromAddressInputs,
  toAddressinputs,
  paymentTermsInputs,
  itemListInputs,
} from "../formSource";
import { useState } from "react";

const NewInvoiceModal = () => {
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML =
        option.querySelector("label").innerHTML;
      document.querySelector(".options-container").classList.remove("active");
    });
  });

  // Sub-states
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [invoiceDate, setInvoiceDate] = useState();

  // Main state
  const [data, setData] = useState();

  const handleFromInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    // Interesting "[id]" syntax. Instead of specifying a new key with the name of "id" (in the case of "id: value"),
    // it takes the id of the currently active element and assigns the onChange value to it.
    setFromData({ ...fromData, [id]: value });
    setData({
      fromData: { ...fromData },
      toData: { ...toData },
      ...invoiceDate,
    });
  };

  const handleToInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setToData({ ...toData, [id]: value });
    setData({
      fromData: { ...fromData },
      toData: { ...toData },
      ...invoiceDate,
    });
  };

  const handleInvoiceDateInput = (e) => {
    setInvoiceDate({ invoiceDate: e });
    setData({
      fromData: { ...fromData },
      toData: { ...toData },
      ...invoiceDate,
    });
  };

  console.log(data);

  const handleAddNewInvoice = async () => {
    toast.success("New invoice supposedly created!");
  };

  return (
    <StyledNewInvoiceModal className="new-invoice-modal-overlay">
      <main className="new-invoice-modal-container">
        <h1>New Invoice</h1>
        <section className="bill-from-container">
          <p className="bill-from-parapgrah">Bill From</p>
          <div className="from-address-container">
            {fromAddressInputs.map((input) => (
              <div key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  onChange={handleFromInput}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="bill-to-container">
          <p className="bill-to-parapgrah">Bill To</p>
          <div className="client-info-container">
            {toAddressinputs.map((input) => (
              <div key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  onChange={handleToInput}
                />
              </div>
            ))}
          </div>
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
              onChange={handleInvoiceDateInput}
            />
            <div className="payment-terms-container">
              <label>Payment Terms</label>
              <div className="payment-terms-select-box">
                <div className="options-container">
                  {paymentTermsInputs.map((input) => (
                    <div className="option" key={input.id}>
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
                  onClick={() => {
                    document
                      .querySelector(".options-container")
                      .classList.toggle("active");
                  }}
                >
                  <h4>Select Payment Terms</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="item-list-container">
          <h2>Item List</h2>
          <div className="item-list-input-table">
            {itemListInputs.map((input) => (
              <div key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
            ))}
            <img src="/assets/icon-delete.svg" alt="delete item" />
          </div>
          <button className="add-new-item-btn">+ Add New Item</button>
        </section>
        <section className="new-invoice-btn-container">
          <button className="discard-btn">Discard</button>
          <div className="save-btn-container">
            <button className="save-draft-btn">Save as Draft</button>
            <button onClick={handleAddNewInvoice} className="save-send-btn">
              Save & Send
            </button>
          </div>
        </section>
      </main>
    </StyledNewInvoiceModal>
  );
};

export default NewInvoiceModal;
