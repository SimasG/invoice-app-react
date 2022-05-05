import { StyledEditInvoiceModal } from "../../styles/modals/EditInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// TODO: Add state to every object in the array of objects
// TODO: Allow editing each item's properties (change state)
// TODO: Allow adding new items (& add state to them)
// TODO: Allow to delete items

const EditInvoiceModal = ({ setEditOpen, selectedInvoice }) => {
  const [editInvoiceModal, setEditInvoiceModal] = useState({
    senderAddress: {
      street: selectedInvoice.senderAddress.street,
      city: selectedInvoice.senderAddress.city,
      postcode: selectedInvoice.senderAddress.postCode,
      country: selectedInvoice.senderAddress.country,
    },
    clientInfo: {
      clientName: selectedInvoice.clientName,
      clientEmail: selectedInvoice.clientEmail,
    },
    clientAddress: {
      street: selectedInvoice.clientAddress.street,
      city: selectedInvoice.clientAddress.city,
      postcode: selectedInvoice.clientAddress.postCode,
      country: selectedInvoice.clientAddress.country,
    },
    invoiceDate: dayjs(selectedInvoice.createdAt).$d,
    paymentTerms: selectedInvoice.paymentTerms,
    description: selectedInvoice.description,
  });

  const [items, setItems] = useState([
    {
      id: uuidv4(),
      name: "",
      quantity: "",
      price: "",
      total: "",
    },
  ]);

  console.log(editInvoiceModal.invoiceDate);

  // creating state to know which item is being updated
  const [currentItem, setCurrentItem] = useState({});

  const handleNameInputChange = (item, e) => {
    setCurrentItem({ ...item, name: e.target.value });
    // console.log(currentItem.id);
    // handleEditName(currentItem.id, currentItem);
  };

  const handleEditName = (id, updatedItem) => {
    const updatedObject = items.map((item) =>
      // console.log(`item.id: ${item.id}`);
      // console.log(`id: ${id}`);
      item.id === id ? updatedItem : item
    );
    // console.log(updatedObject);

    setItems(updatedObject);
  };

  // Utterly useless atm
  const [itemName, setItemName] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [itemTotal, setItemTotal] = useState(null);

  // Pre-filling Payment Terms Dropdown
  useEffect(() => {
    document.querySelectorAll(".option").forEach((option) => {
      if (
        parseInt(option.querySelector(".payment-terms-radio").value) ===
        editInvoiceModal.paymentTerms
      ) {
        document.querySelector(".selected").innerHTML =
          option.querySelector("label").innerHTML;
      }
    });
  }, [editInvoiceModal.paymentTerms]);

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

  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML =
        option.querySelector("label").innerHTML;
      document.querySelector(".options-container").classList.remove("active");
      document.querySelector(".selected").classList.remove("margin-bottom");
    });
  });

  return (
    <StyledEditInvoiceModal
      className="new-invoice-modal-overlay"
      onClick={() => setEditOpen(false)}
    >
      <main
        className="new-invoice-modal-container"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h1>
          Edit <span>#</span>
          {selectedInvoice.id}
        </h1>
        <section className="bill-from-container">
          <p className="bill-from-parapgrah">Bill From</p>
          <div className="from-address-container">
            <div className="street-address">
              <label>Street Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={editInvoiceModal.senderAddress.street}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    senderAddress: {
                      ...editInvoiceModal.senderAddress,
                      street: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="from-address-subcontainer">
              <div className="city">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={editInvoiceModal.senderAddress.city}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      senderAddress: {
                        ...editInvoiceModal.senderAddress,
                        city: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="post-code">
                <label>Post Code</label>
                <input
                  type="text"
                  placeholder="Post Code"
                  value={editInvoiceModal.senderAddress.postcode}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      senderAddress: {
                        ...editInvoiceModal.senderAddress,
                        postcode: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="country">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="country"
                  value={editInvoiceModal.senderAddress.country}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      senderAddress: {
                        ...editInvoiceModal.senderAddress,
                        country: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bill-to-container">
          <p className="bill-to-parapgrah">Bill To</p>
          <div className="client-info-container">
            <div className="client-name">
              <label>Client's Name</label>
              <input
                type="text"
                placeholder="Client's Name"
                value={editInvoiceModal.clientInfo.clientName}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    clientInfo: {
                      ...editInvoiceModal.clientInfo,
                      clientName: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="client-email">
              <label>Client's Email</label>
              <input
                type="text"
                placeholder="Client's Email"
                value={editInvoiceModal.clientInfo.clientEmail}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    clientInfo: {
                      ...editInvoiceModal.clientInfo,
                      clientEmail: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="client-street-address">
              <label>Street Address</label>
              <input
                type="text"
                placeholder="Street Address"
                value={editInvoiceModal.clientAddress.street}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    clientAddress: {
                      ...editInvoiceModal.clientAddress,
                      street: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="to-address-subcontainer">
              <div className="to-city">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={editInvoiceModal.clientAddress.city}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      clientAddress: {
                        ...editInvoiceModal.clientAddress,
                        city: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="to-post-code">
                <label>Post Code</label>
                <input
                  type="text"
                  placeholder="Post Code"
                  value={editInvoiceModal.clientAddress.postcode}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      clientAddress: {
                        ...editInvoiceModal.clientAddress,
                        postcode: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="to-country">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="country"
                  value={editInvoiceModal.clientAddress.country}
                  onChange={(e) => {
                    setEditInvoiceModal({
                      ...editInvoiceModal,
                      clientAddress: {
                        ...editInvoiceModal.clientAddress,
                        country: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="invoice-info-container">
            <div className="date-payment-terms-container">
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
                value={editInvoiceModal.invoiceDate}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    invoiceDate: e,
                  });
                }}
              />
              <div className="payment-terms-container">
                <label>Payment Terms</label>
                <div className="payment-terms-select-box">
                  <div className="options-container">
                    <div
                      className="option"
                      onClick={() =>
                        setEditInvoiceModal({
                          ...editInvoiceModal,
                          paymentTerms: 1,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="payment-terms-radio"
                        id="net-1-day"
                        name="payment-term-date"
                        value={1}
                      />
                      <label htmlFor="net-1-day">Net 1 Day</label>
                    </div>
                    <div
                      className="option"
                      onClick={() =>
                        setEditInvoiceModal({
                          ...editInvoiceModal,
                          paymentTerms: 7,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="payment-terms-radio"
                        id="net-7-days"
                        name="payment-term-date"
                        value={7}
                      />
                      <label htmlFor="net-7-days">Net 7 Days</label>
                    </div>
                    <div
                      className="option"
                      onClick={() =>
                        setEditInvoiceModal({
                          ...editInvoiceModal,
                          paymentTerms: 14,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="payment-terms-radio"
                        id="net-14-days"
                        name="payment-term-date"
                        value={14}
                      />
                      <label htmlFor="net-14-days">Net 14 Days</label>
                    </div>
                    <div
                      className="option"
                      onClick={() =>
                        setEditInvoiceModal({
                          ...editInvoiceModal,
                          paymentTerms: 30,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="payment-terms-radio"
                        id="net-30-days"
                        name="payment-term-date"
                        value={30}
                      />
                      <label htmlFor="net-30-days">Net 30 Days</label>
                    </div>
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
                value={editInvoiceModal.description}
                onChange={(e) => {
                  setEditInvoiceModal({
                    ...editInvoiceModal,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </section>
        <section className="item-list-container">
          <h2>Item List</h2>
          <div className="item-list-input-table">
            <div className="item-list-title-container">
              <label>Item Name</label>
              <label>Qty.</label>
              <label>Price</label>
              <label>Total</label>
            </div>
            <div className="item-list-input-container">
              {selectedInvoice.items.map((item) => {
                const uuid = uuidv4();
                return (
                  <div className="item-list-input" key={uuid}>
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={item.name}
                      onChange={(e) => {
                        handleNameInputChange(item, e);
                      }}
                      // value={item.name}
                      // onChange={(e) =>
                      //   setItems([
                      //     ...items,
                      //     {
                      //       ...item,
                      //       name: e.target.value,
                      //     },
                      //   ])
                      // }
                    />
                    <input
                      type="number"
                      placeholder="Qty."
                      // value={item.quantity}
                      // onChange={(e) => setItemQuantity(e.target.value)}
                      value={item.quantity}
                      onChange={(e) =>
                        setItems([
                          ...items,
                          {
                            ...item,
                            quantity: e.target.value,
                          },
                        ])
                      }
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      // value={item.price}
                      // onChange={(e) => setItemPrice(e.target.value)}
                      value={item.price}
                      onChange={(e) =>
                        setItems([
                          ...items,
                          {
                            ...item,
                            price: e.target.value,
                          },
                        ])
                      }
                    />
                    <input
                      type="number"
                      placeholder="total"
                      // value={item.total}
                      // onChange={(e) => setItemTotal(e.target.value)}
                      value={item.price}
                      onChange={(e) =>
                        setItems([
                          ...items,
                          {
                            ...item,
                            price: e.target.value,
                          },
                        ])
                      }
                    />
                    <img
                      className="delete-item-btn"
                      src="/assets/icon-delete.svg"
                      alt="delete item"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="add-new-item-btn">+ Add New Item</button>
        </section>
        <section className="new-invoice-btn-container">
          <button className="cancel-btn" onClick={() => setEditOpen(false)}>
            Discard
          </button>
          <button className="save-changes-btn">Save & Send</button>
        </section>
      </main>
    </StyledEditInvoiceModal>
  );
};

export default EditInvoiceModal;
