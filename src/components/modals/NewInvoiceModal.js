import { StyledNewInvoiceModal } from "../../styles/modals/NewInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
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

const NewInvoiceModal = ({ data, setData }) => {
  // Pure cancer. Need to find a way to sync formErrors state when submitting the form.
  const [formErrors, setFormErrors] = useState({ fromDataStreetAddress: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const resetData = () => {
    // Re-setting invoice data
    setData({
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
          price: "",
          qty: "",
          total: "",
        },
      ],
    });
  };

  // Resetting the data on the first render
  useEffect(() => {
    setData({
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
          price: "",
          qty: "",
          total: "",
        },
      ],
    });
  }, []);

  // Submitting the form once there's no errors

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
    const updatedData = {
      ...data,
      itemList: [
        ...data.itemList,
        {
          uid: uuidv4(),
          itemName: "",
          price: "",
          qty: "",
          total: "",
        },
      ],
    };
    setData(updatedData);
  };

  const handleDeleteItem = (uid) => {
    setData({
      ...data,
      itemList: data.itemList.filter((item) => uid !== item.uid),
    });
    toast.success("Item deleted");
  };

  // CRUD -> C: Storing main state in a db
  const handleAddNewInvoice = async (invoiceStatus) => {
    setFormErrors(validate(data));
    setIsSubmitted(true);

    if (Object.keys(formErrors).length === 0) {
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
        status: invoiceStatus,
        id: id,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      toast.success("New invoice created!");
      navigate("/");

      resetData();
    }
  };

  const validate = (formData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.fromData.streetAddress) {
      errors.fromDataStreetAddress = "Street Address is Required!";
    }
    if (!formData.fromData.city) {
      errors.fromDataCity = "Country is Required!";
    }
    if (!formData.fromData.postCode) {
      errors.fromDataPostCode = "Post code is Required!";
    }
    if (!formData.fromData.country) {
      errors.fromDataCountry = "Country is Required!";
    }
    if (!formData.toData.clientName) {
      errors.toDataClientName = "Client Name is Required!";
    }
    if (!formData.toData.clientEmail) {
      errors.toDataClientEmail = "Client Email is Required!";
    } else if (!regex.test(formData.toData.clientEmail)) {
      errors.toDataClientEmail = "The Email Format is Incorrect!";
    }
    if (!formData.toData.streetAddress) {
      errors.toDataStreetAddress = "Street Address is Required!";
    }
    if (!formData.toData.city) {
      errors.toDataCity = "City is Required!";
    }
    if (!formData.toData.postCode) {
      errors.toDataPostCode = "Post Code is Required!";
    }
    if (!formData.toData.country) {
      errors.toDataCountry = "Country is Required!";
    }
    if (!formData.invoiceDate) {
      errors.invoiceDate = "Invoice Date is Required!";
    }
    if (!formData.paymentTerms) {
      errors.paymentTerms = "Payment Terms are Required!";
    }
    if (!formData.description) {
      errors.description = "Project Description is Required!";
    }

    formData.itemList.forEach((item) => {
      if (!item.itemName) {
        errors.itemName = "Name is Required!";
      }
    });

    return errors;
  };

  // Counter for mapped items (cancer)
  let n = 0;
  let m = -1;

  return (
    <>
      {data && (
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
                      value={data.fromData.streetAddress}
                      onChange={(e) => {
                        setData({
                          ...data,
                          fromData: {
                            ...data.fromData,
                            streetAddress: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.fromDataStreetAddress}</p>
                  </div>
                  <div key="city">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      id="city"
                      value={data.fromData.city}
                      onChange={(e) => {
                        setData({
                          ...data,
                          fromData: {
                            ...data.fromData,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.fromDataCity}</p>
                  </div>
                  <div key="postCode">
                    <label>Post Code</label>
                    <input
                      type="text"
                      placeholder="Post Code"
                      id="postCode"
                      value={data.fromData.postCode}
                      onChange={(e) => {
                        setData({
                          ...data,
                          fromData: {
                            ...data.fromData,
                            postCode: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.fromDataPostCode}</p>
                  </div>
                  <div key="country">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      id="country"
                      value={data.fromData.country}
                      onChange={(e) => {
                        setData({
                          ...data,
                          fromData: {
                            ...data.fromData,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.fromDataCountry}</p>
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
                      value={data.toData.clientName}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            clientName: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataClientName}</p>
                  </div>
                  <div key="clientEmail">
                    <label>Client's Email</label>
                    <input
                      type="text"
                      placeholder="Client's Email"
                      id="clientEmail"
                      value={data.toData.clientEmail}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            clientEmail: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataClientEmail}</p>
                  </div>
                  <div key="toStreetAddress">
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street Address"
                      id="toStreetAddress"
                      value={data.toData.streetAddress}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            streetAddress: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataStreetAddress}</p>
                  </div>
                  <div key="toCity">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      id="toCity"
                      value={data.toData.city}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataCity}</p>
                  </div>
                  <div key="toPostCode">
                    <label>Post Code</label>
                    <input
                      type="text"
                      placeholder="Post Code"
                      id="toPostCode"
                      value={data.toData.postCode}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            postCode: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataPostCode}</p>
                  </div>
                  <div key="toCountry">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      id="toCountry"
                      value={data.toData.country}
                      onChange={(e) => {
                        setData({
                          ...data,
                          toData: {
                            ...data.toData,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                    <p>{formErrors.toDataCountry}</p>
                  </div>
                </div>
                <div className="invoice-info-container">
                  <div className="date-picker-container">
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
                      value={data.invoiceDate}
                      onChange={(e) => {
                        setData({
                          ...data,
                          invoiceDate: e,
                        });
                      }}
                    />
                    <p>{formErrors.invoiceDate}</p>
                  </div>
                  <div className="payment-terms-container">
                    <label>Payment Terms</label>
                    <div className="payment-terms-select-box">
                      <div className="options-container">
                        <div
                          className="option"
                          key="net1Day"
                          value={data.paymentTerms}
                          onClick={() =>
                            setData({
                              ...data,
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
                          value={data.paymentTerms}
                          onClick={() =>
                            setData({
                              ...data,
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
                          value={data.paymentTerms}
                          onClick={() =>
                            setData({
                              ...data,
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
                          value={data.paymentTerms}
                          onClick={() =>
                            setData({
                              ...data,
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
                      <p>{formErrors.paymentTerms}</p>
                    </div>
                  </div>
                </div>
                <div className="project-description-container">
                  <label>Project Description</label>
                  <input
                    type="text"
                    placeholder="Project Description"
                    value={data.description}
                    onChange={(e) => {
                      setData({
                        ...data,
                        description: e.target.value,
                      });
                    }}
                  />
                  <p>{formErrors.description}</p>
                </div>
              </section>
              <section className="item-list-container">
                <h2>Item List</h2>
                <div className="item-list-input-table">
                  <div className="item-list-input-table-subcontainer">
                    {data.itemList.map((item) => {
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
                                value={data.itemList[m][input.id]}
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    itemList: data.itemList.map((i) =>
                                      i.uid === item.uid
                                        ? { ...i, [input.id]: e.target.value }
                                        : i
                                    ),
                                  });
                                }}
                              />
                              {/* {formErrors.itemName && <p>Name is Required!</p>} */}
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
                    resetData();
                    navigate("/");
                  }}
                >
                  Discard
                </button>
                <div className="save-btn-container">
                  <button
                    className="save-draft-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddNewInvoice("Draft");
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    className="save-send-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddNewInvoice("Pending");
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
