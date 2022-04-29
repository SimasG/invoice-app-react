import { StyledNewInvoiceModal } from "../styles/NewInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import {
  fromAddressInputs,
  toAddressinputs,
  paymentTermsInputs,
  // itemListInputs,
} from "../formSource";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// TODO: Add additional list items to the main state

const NewInvoiceModal = () => {
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

  // Sub-states
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [paymentTerms, setPaymentTerms] = useState();
  const [itemList, setItemList] = useState([
    {
      uid: uuidv4(),
      itemName: "",
      price: 0,
      qty: 0,
      total: 0,
    },
    {
      uid: uuidv4(),
      itemName: "",
      price: 0,
      qty: 0,
      total: 0,
    },
    {
      uid: uuidv4(),
      itemName: "",
      price: 0,
      qty: 0,
      total: 0,
    },
  ]);
  const [description, setDescription] = useState();

  // Main state
  const [data, setData] = useState();

  const itemListInputs = [
    {
      id: "item-name",
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

  // AGGREGATING SUB-STATES INTO MAIN STATE
  const handleSetData = () => {
    setData({
      fromData: { ...fromData },
      toData: { ...toData },
      ...invoiceDate,
      ...paymentTerms,
      ...description,
      itemList: { ...itemList },
    });
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

  const handleItemListInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setItemList({ ...itemList, [id]: value });
    handleSetData();
  };

  const testArrayOfObjects = [
    {
      0: {
        0: {
          0: {
            "item-name": 1,
          },
          qty: 2,
        },
        price: 3,
      },
      total: 4,
    },
  ];

  // HANDLING ADDING NEW ITEMS
  const handleAddNewItem = () => {
    // const updatedItemList = [
    //   itemList,
    //   {
    //     "item-name": "yay",
    //     price: "1",
    //     qty: "11",
    //     total: "111",
    //   },
    // ];
    // console.log(updatedItemList);
    // setItemList(updatedItemList);
  };

  console.log(itemList);

  const handleAddNewInvoice = async () => {
    toast.success("New invoice supposedly created!");
  };

  // Counter for mapped items (cancer)
  let n = 0;

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
                  <h4>Select Payment Terms</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="project-description-container">
            <label>Project Description</label>
            <input
              type="text"
              placeholder="Project Description"
              onChange={handleDescriptionInput}
            />
          </div>
        </section>
        <section className="item-list-container">
          <h2>Item List</h2>
          <div className="item-list-input-table">
            <div className="item-list-input-table-subcontainer">
              {itemList.map((item) => {
                // Cancer
                n += 1;
                return (
                  <div className="item" key={item.uid}>
                    {itemListInputs.map((input) => (
                      <div key={input.id}>
                        {n <= 1 && <label>{input.label}</label>}
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          id={input.id}
                          onChange={handleItemListInput}
                        />
                      </div>
                    ))}
                    <img src="/assets/icon-delete.svg" alt="delete item" />
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
