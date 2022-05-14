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
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FormikControl from "../form/FormikControl";
import * as Yup from "yup";

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

  const dropdownOptions = [
    { key: "Select Payment Terms", value: "" },
    { key: "Net 1 Day", value: "net1day" },
    { key: "Net 7 Days", value: "net7days" },
    { key: "Net 14 Days", value: "net14days" },
    { key: "Net 30 Days", value: "net30days" },
  ];

  const initialValues = {
    fromStreetAddress: "",
    fromCity: "",
    fromPostCode: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    toStreetAddress: "",
    toCity: "",
    toPostCode: "",
    toCountry: "",
    description: "",
    invoiceDate: null,
    paymentTerms: "",
    itemList: [
      {
        uid: uuidv4(),
        itemName: "",
        price: "",
        qty: "",
        total: "",
      },
    ],
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fromStreetAddress) {
      errors.fromStreetAddress = "Street Address is Required!";
    }
    if (!values.fromCity) {
      errors.fromCity = "City is Required!";
    }
    if (!values.fromPostCode) {
      errors.fromPostCode = "Post code is Required!";
    }
    if (!values.fromCountry) {
      errors.fromCountry = "Country is Required!";
    }
    if (!values.clientName) {
      errors.clientName = "Client Name is Required!";
    }
    if (!values.clientEmail) {
      errors.clientEmail = "Client Email is Required!";
    } else if (!regex.test(values.clientEmail)) {
      errors.clientEmail = "The Email Format is Incorrect!";
    }
    if (!values.toStreetAddress) {
      errors.toStreetAddress = "Street Address is Required!";
    }
    if (!values.toCity) {
      errors.toCity = "City is Required!";
    }
    if (!values.toPostCode) {
      errors.toPostCode = "Post Code is Required!";
    }
    if (!values.toCountry) {
      errors.toCountry = "Country is Required!";
    }
    // if (!values.invoiceDate) {
    //   errors.invoiceDate = "Invoice Date is Required!";
    // }
    if (!values.paymentTerms) {
      errors.paymentTerms = "Payment Terms are Required!";
    }
    if (!values.description) {
      errors.description = "Project Description is Required!";
    }
    // if (!values.itemList[0].itemName) {
    //   errors.itemList[0].itemName = "Name is Required!";
    // }

    // values.itemList.forEach((item) => {
    //   if (!item.itemName) {
    //     errors.itemList[0].itemName = "Name is Required!";
    //   }
    // });
    return errors;
  };

  const validationSchema = Yup.object({
    fromStreetAddress: Yup.string().required("Street Address is Required!"),
    fromCity: Yup.string().required("City is Required!"),
    fromPostCode: Yup.string().required("Post Code is Required!"),
    fromCountry: Yup.string().required("Country is Required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form Data", values);
    // Setting "isSubmitting" back to false once the form has been submitted. IRL, would be done after the server response.
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    toast.success("New invoice created!");
  };

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
    setFormErrors(validateOld(data));
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

  const validateOld = (formData) => {
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

  return (
    <>
      {data && (
        <StyledNewInvoiceModal className="new-invoice-modal-overlay">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="new-invoice-modal-container">
                  <h1 className="title">New Invoice</h1>
                  <section className="bill-from-container">
                    <p className="bill-from-parapgrah">Bill From</p>
                    <div className="from-address-container">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Street Address"
                        name="fromStreetAddress"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="City"
                        name="fromCity"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Post Code"
                        name="fromPostCode"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Country"
                        name="fromCountry"
                      />
                    </div>
                  </section>
                  <section className="bill-to-container">
                    <p className="bill-to-parapgrah">Bill To</p>
                    <div className="client-info-container">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Client's Name"
                        name="clientName"
                      />
                      <FormikControl
                        control="input"
                        type="email"
                        label="Client's Email"
                        name="clientEmail"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Street Address"
                        name="toStreetAddress"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="City"
                        name="toCity"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Post Code"
                        name="toPostCode"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Country"
                        name="toCountry"
                      />
                    </div>
                    <div className="invoice-info-container">
                      <FormikControl
                        control="date"
                        label="Invoice Date"
                        name="invoiceDate"
                      />
                      {/* <div className="date-picker-container">
                      <label htmlFor="invoiceDate">Invoice Date</label>
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
                        id="invoice-date"
                        name="invoiceDate"
                      ></DatePicker>
                      <p>{formErrors.invoiceDate}</p>
                    </div> */}
                      <FormikControl
                        control="select"
                        label="Payment Terms"
                        name="paymentTerms"
                        options={dropdownOptions}
                      />
                      {/* <div className="payment-terms-container">
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
                    </div> */}
                    </div>
                    <div className="project-description-container">
                      <label htmlFor="description">Project Description</label>
                      <Field
                        type="text"
                        placeholder="Project Description"
                        name="description"
                      />
                      <ErrorMessage name="description" component="p" />
                    </div>
                  </section>
                  <section className="item-list-container">
                    <h2>Item List</h2>
                    <div className="item-list-input-table">
                      <FieldArray name="itemList">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { itemList } = values;
                          return (
                            <>
                              <div className="item-list-input-table-subcontainer">
                                {itemList.map((item, index) => (
                                  <div key={index} className="item">
                                    {itemListInputs.map((input) => (
                                      <div key={input.id}>
                                        {index < 1 && (
                                          <label htmlFor={input.id}>
                                            {input.label}
                                          </label>
                                        )}
                                        <Field
                                          type={input.type}
                                          placeholder={input.placeholder}
                                          name={`itemList[${index}].${input.id}`}
                                        />
                                        {/* <ErrorMessage
                                          name={`itemList[${index}].${input.id}`}
                                          component="p"
                                        /> */}
                                      </div>
                                    ))}
                                    {itemList.length > 1 && (
                                      <img
                                        src="/assets/icon-delete.svg"
                                        alt="delete item"
                                        onClick={() => remove(index)}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                              <button
                                // If type is not specified, Formik will assume type is "submit" and try to submit the form
                                type="button"
                                className="add-new-item-btn"
                                onClick={() =>
                                  push({
                                    uid: uuidv4(),
                                    itemName: "",
                                    price: "",
                                    qty: "",
                                    total: "",
                                  })
                                }
                              >
                                + Add New Item
                              </button>
                            </>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </section>
                  <section className="new-invoice-btn-container">
                    <button
                      type="button"
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
                        type="submit"
                        className="save-draft-btn"
                        disabled={formik.isSubmitting}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   handleAddNewInvoice("Draft");
                        // }}
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        className="save-send-btn"
                        disabled={formik.isSubmitting}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   handleAddNewInvoice("Pending");
                        // }}
                      >
                        Save & Send
                      </button>
                    </div>
                  </section>
                </Form>
              );
            }}
          </Formik>
        </StyledNewInvoiceModal>
      )}
    </>
  );
};

export default NewInvoiceModal;
