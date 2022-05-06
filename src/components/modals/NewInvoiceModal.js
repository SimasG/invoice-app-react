import { StyledNewInvoiceModal } from "../../styles/modals/NewInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import {
  fromAddressInputs,
  toAddressinputs,
  paymentTermsInputs,
} from "../../formSource";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createRandomLetters,
  createRandomNumbers,
} from "../../misc/idGenerator";

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

const NewInvoiceModal = () => {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const [testData, setTestData] = useState({
    fromData: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    toData: {
      clientName: "",
      clientEmail: "",
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: "",
    paymentTerms: "",
    description: "",
    itemList: [
      {
        uid: uuidv4(),
        itemName: "",
        price: 0,
        qty: 0,
        total: 0,
      },
    ],
  });

  // Form main state
  const [data, setData] = useState();

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

  // HANDLING ADDING & DELETING NEW ITEMS
  const handleAddNewItem = (e) => {
    e.preventDefault();
    const updatedTestData = {
      ...testData,
      itemList: [
        ...testData.itemList,
        {
          uid: uuidv4(),
          itemName: "",
          price: 0,
          qty: 0,
          total: 0,
        },
      ],
    };
    setTestData(updatedTestData);
  };

  // TODO: Merge itemList state with the main state -> WIP

  const handleDeleteItem = (uid) => {
    // setItemList(itemList.filter((item) => uid !== item.uid));
    // toast.success("Item deleted");
  };

  // CRUD -> C: Storing main state in a db
  const handleAddNewInvoice = async () => {
    const id = `${createRandomLetters(2)}${createRandomNumbers(4)}`;

    const invoicesCollectionRef = doc(
      db,
      "users",
      currentUser.uid,
      "invoices",
      id
    );
    await setDoc(invoicesCollectionRef, {
      ...data,
      id: id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("New invoice created!");
    navigate("/");
  };

  // Counter for mapped items (cancer)
  let n = 0;
  let m = -1;

  console.log(testData);

  return (
    <>
      {testData && (
        <StyledNewInvoiceModal
          className="new-invoice-modal-overlay"
          onClick={() => {
            navigate("/");
          }}
        >
          <main
            className="new-invoice-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>New Invoice</h1>
            <form>
              <section className="bill-from-container">
                <p className="bill-from-parapgrah">Bill From</p>
                <div className="from-address-container">
                  <div key="streetAddress">
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street Address"
                      id="streetAddress"
                      value={testData.fromData.streetAddress}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          fromData: {
                            ...testData.fromData,
                            streetAddress: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="city">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      id="city"
                      value={testData.fromData.city}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          fromData: {
                            ...testData.fromData,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="postCode">
                    <label>Post Code</label>
                    <input
                      type="text"
                      placeholder="Post Code"
                      id="postCode"
                      value={testData.fromData.postCode}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          fromData: {
                            ...testData.fromData,
                            postCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="country">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      id="country"
                      value={testData.fromData.country}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          fromData: {
                            ...testData.fromData,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </section>
              <section className="bill-to-container">
                <p className="bill-to-parapgrah">Bill To</p>
                <div className="client-info-container">
                  <div key="clientName">
                    <label>Client's Name</label>
                    <input
                      type="text"
                      placeholder="Client's Name"
                      id="clientName"
                      value={testData.toData.clientName}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            clientName: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="clientEmail">
                    <label>Client's Email</label>
                    <input
                      type="text"
                      placeholder="Client's Email"
                      id="clientEmail"
                      value={testData.toData.clientEmail}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            clientEmail: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="toStreetAddress">
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street Address"
                      id="toStreetAddress"
                      value={testData.toData.streetAddress}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            streetAddress: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="toCity">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      id="toCity"
                      value={testData.toData.city}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="toPostCode">
                    <label>Post Code</label>
                    <input
                      type="text"
                      placeholder="Post Code"
                      id="toPostCode"
                      value={testData.toData.postCode}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            postCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div key="toCountry">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      id="toCountry"
                      value={testData.toData.country}
                      onChange={(e) => {
                        setTestData({
                          ...testData,
                          toData: {
                            ...testData.toData,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
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
                    value={testData.invoiceDate}
                    onChange={(e) => {
                      setTestData({
                        ...testData,
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
                          key="net1Day"
                          value={testData.paymentTerms}
                          onClick={() =>
                            setTestData({
                              ...testData,
                              paymentTerms: "Net 1 Day",
                            })
                          }
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="net1Day"
                            name="payment-term-date"
                          />
                          <label htmlFor="net1Day">Net 1 Day</label>
                        </div>
                        <div
                          className="option"
                          key="net7Days"
                          value={testData.paymentTerms}
                          onClick={() =>
                            setTestData({
                              ...testData,
                              paymentTerms: "Net 7 Days",
                            })
                          }
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="net7Days"
                            name="payment-term-date"
                          />
                          <label htmlFor="net7Days">Net 7 Days</label>
                        </div>
                        <div
                          className="option"
                          key="net14Days"
                          value={testData.paymentTerms}
                          onClick={() =>
                            setTestData({
                              ...testData,
                              paymentTerms: "Net 14 Days",
                            })
                          }
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="net14Days"
                            name="payment-term-date"
                          />
                          <label htmlFor="net14Days">Net 14 Days</label>
                        </div>
                        <div
                          className="option"
                          key="net30Days"
                          value={testData.paymentTerms}
                          onClick={() =>
                            setTestData({
                              ...testData,
                              paymentTerms: "Net 30 Days",
                            })
                          }
                        >
                          <input
                            type="radio"
                            className="radio"
                            id="net30Days"
                            name="payment-term-date"
                          />
                          <label htmlFor="net30Days">Net 30 Days</label>
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
                    value={testData.description}
                    onChange={(e) => {
                      setTestData({
                        ...testData,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </section>
              <section className="item-list-container">
                <h2>Item List</h2>
                <div className="item-list-input-table">
                  <div className="item-list-input-table-subcontainer">
                    {testData.itemList.map((item) => {
                      // Cancer
                      n += 1;
                      m += 1;
                      return (
                        <div className="item" key={item.uid}>
                          {itemListInputs.map((input) => (
                            <div key={input.id}>
                              {n <= 1 && <label>{input.label}</label>}
                              <input
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                                value={testData.itemList[m][input.id]}
                                onChange={(e) => {
                                  setTestData({
                                    ...testData,
                                    // Mapped items are automatically stored in an array you are mapping through.
                                    // If I specify an array here, it'll become an increasingly nested array of arrays - no bueno.
                                    itemList: testData.itemList.map((i) =>
                                      i.uid === item.uid
                                        ? { ...i, [input.id]: e.target.value }
                                        : i
                                    ),
                                  });
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
                <button
                  className="add-new-item-btn"
                  onClick={(e) => handleAddNewItem(e)}
                >
                  + Add New Item
                </button>
              </section>
              <section className="new-invoice-btn-container">
                <button
                  className="discard-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Discard
                </button>
                <div className="save-btn-container">
                  <button
                    // type="submit"
                    className="save-draft-btn"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    // type="submit"
                    className="save-send-btn"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Save & Send
                  </button>
                </div>
              </section>
            </form>
          </main>
        </StyledNewInvoiceModal>
      )}
    </>
  );
};

export default NewInvoiceModal;
