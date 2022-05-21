import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  useFormikContext,
} from "formik";
import FormikControl from "./FormikControl";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  createRandomLetters,
  createRandomNumbers,
} from "../../misc/idGenerator";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const FormikForm = ({ status }) => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const dropdownOptions = [
    { key: "Select Payment Terms", value: "" },
    { key: "Net 1 Day", value: "1" },
    { key: "Net 7 Days", value: "7" },
    { key: "Net 14 Days", value: "14" },
    { key: "Net 30 Days", value: "30" },
  ];

  const formik = useFormikContext();
  const { values, setSubmitting, resetForm } = formik;

  // CRUD -> C: Storing main state in a db
  const handleSubmit = async (invoiceStatus) => {
    setSubmitting(true);
    const id = `${createRandomLetters(2)}${createRandomNumbers(4)}`;

    const invoicesCollectionRef = doc(
      db,
      "users",
      currentUser.uid,
      "invoices",
      id
    );
    await setDoc(invoicesCollectionRef, {
      ...values,
      status: invoiceStatus,
      id: id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("New invoice created!");
    navigate("/");
    resetForm();
    setSubmitting(false);
  };

  // CRUD -> U: Updating main state in a db
  const handleUpdateInvoice = async (id) => {
    setSubmitting(true);
    const invoicesDocRef = doc(db, "users", currentUser.uid, "invoices", id);
    await updateDoc(invoicesDocRef, {
      ...values,
      id: id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("Invoice updated!");
    navigate("/");
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      {values && (
        <Form className="new-invoice-modal-container">
          {status === "new" ? (
            <h1 className="title">New Invoice</h1>
          ) : (
            <h1 className="title">
              Edit <span>#</span>
              {values.id}
            </h1>
          )}
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
                className="short-input"
              />
              <FormikControl
                control="input"
                type="text"
                label="Post Code"
                name="toPostCode"
                className="short-input"
              />
              <FormikControl
                control="input"
                type="text"
                label="Country"
                name="toCountry"
                className="short-input"
              />
            </div>
            <div className="invoice-info-container">
              <FormikControl
                control="date"
                label="Issue Date"
                name="invoiceDate"
              />
              <FormikControl
                control="select"
                label="Payment Terms"
                name="paymentTerms"
                options={dropdownOptions}
              />
            </div>
            <div className="project-description-container">
              <label htmlFor="description">Project Description</label>
              <Field type="text" name="description" />
              <ErrorMessage
                name="description"
                component="p"
                className="error-msg"
              />
            </div>
          </section>
          <section className="item-list-container">
            <h2>Item List</h2>
            <div className="item-list-input-table">
              <FieldArray name="itemList">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values, handleChange } = form;
                  const { itemList } = values;
                  return (
                    <>
                      <div className="item-list-input-table-subcontainer">
                        <div className="item-list-label-container">
                          <label>Item Name</label>
                          <label>Qty</label>
                          <label>Price</label>
                          <label>Total</label>
                        </div>
                        {itemList.map((item, index) => (
                          // Wny can't I use <FormikControl> here?
                          <div key={item.uid} className="item">
                            <div key={`itemList[${index}].itemName`}>
                              <Field
                                type="text"
                                name={`itemList[${index}].itemName`}
                                className="item-name-input"
                              />
                              <ErrorMessage
                                name={`itemList[${index}].itemName`}
                                component="p"
                                className="error-msg"
                              />
                            </div>
                            <div key={`itemList[${index}].qty`}>
                              <Field
                                type="number"
                                name={`itemList[${index}].qty`}
                                className="qty-input"
                                onChange={(e) => handleChange(e)}
                                value={itemList[index].qty}
                              />
                              <ErrorMessage
                                name={`itemList[${index}].qty`}
                                component="p"
                                className="error-msg"
                              />
                            </div>
                            <div key={`itemList[${index}].price`}>
                              <Field
                                type="number"
                                name={`itemList[${index}].price`}
                                className="price-input"
                                onChange={(e) => handleChange(e)}
                                value={itemList[index].price}
                              />
                              <ErrorMessage
                                name={`itemList[${index}].price`}
                                component="p"
                                className="error-msg"
                              />
                            </div>
                            <div key={`itemList[${index}].total`}>
                              <Field
                                type="number"
                                name={`itemList[${index}].total`}
                                className="total-input"
                                disabled
                                value={(
                                  Number(values.itemList[index].qty) *
                                  Number(values.itemList[index].price)
                                ).toFixed(2)}
                              />
                            </div>
                            {itemList.length > 1 && (
                              <svg
                                width="13"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => remove(index)}
                              >
                                <path
                                  d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                                  fill="#888EB0"
                                  fillRule="nonzero"
                                />
                              </svg>
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
          {status === "new" ? (
            <section className="new-invoice-btn-container">
              <button
                type="button"
                className="discard-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Discard
              </button>
              <div className="save-btn-container">
                <button
                  type="submit"
                  className="save-draft-btn"
                  disabled={!formik.isValid || formik.isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit("Draft");
                  }}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="save-send-btn"
                  disabled={!formik.isValid || formik.isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit("Pending");
                  }}
                >
                  Save & Send
                </button>
              </div>
            </section>
          ) : (
            <section className="edit-invoice-btn-container">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-changes-btn"
                disabled={!formik.isValid || formik.isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateInvoice(values.id);
                }}
              >
                Save Changes
              </button>
            </section>
          )}
        </Form>
      )}
    </>
  );
};

export default FormikForm;
