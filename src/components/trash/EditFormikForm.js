import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  useFormikContext,
} from "formik";
import FormikControl from "../form/FormikControl";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const NewInvoiceModal = ({ data }) => {
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

  // CRUD -> U: Updating main state in a db
  const handleUpdateInvoice = async (id) => {
    setSubmitting(true);
    const invoicesDocRef = doc(db, "users", currentUser.uid, "invoices", id);
    await updateDoc(invoicesDocRef, {
      ...values,
      id: id,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    toast.success("New invoice created!");
    navigate("/");
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      {data && (
        <Form className="new-invoice-modal-container">
          <h1 className="title">
            Edit <span className="edit-heading-span">#</span>
            {data.id}
          </h1>
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
                  const { values, handleChange } = form;
                  const { itemList } = values;
                  return (
                    <>
                      <div className="item-list-input-table-subcontainer">
                        {itemList.map((item, index) => (
                          // Wny can't I use <FormikControl> here?
                          <div key={item.uid} className="item">
                            <div key={`itemList[${index}].itemName`}>
                              {index < 1 && (
                                <label htmlFor={`itemList[${index}].itemName`}>
                                  Item Name
                                </label>
                              )}
                              <Field
                                type="text"
                                name={`itemList[${index}].itemName`}
                              />
                              <ErrorMessage
                                name={`itemList[${index}].itemName`}
                                component="p"
                              />
                            </div>
                            <div key={`itemList[${index}].qty`}>
                              {index < 1 && (
                                <label htmlFor={`itemList[${index}].qty`}>
                                  Qty
                                </label>
                              )}
                              <Field
                                type="number"
                                name={`itemList[${index}].qty`}
                                onChange={(e) => handleChange(e)}
                                value={itemList[index].qty}
                              />
                              <ErrorMessage
                                name={`itemList[${index}].qty`}
                                component="p"
                              />
                            </div>
                            <div key={`itemList[${index}].price`}>
                              {index < 1 && (
                                <label htmlFor={`itemList[${index}].price`}>
                                  Price
                                </label>
                              )}
                              <Field
                                type="number"
                                name={`itemList[${index}].price`}
                                onChange={(e) => handleChange(e)}
                                value={itemList[index].price}
                              />
                              <ErrorMessage
                                name={`itemList[${index}].price`}
                                component="p"
                              />
                            </div>
                            <div key={`itemList[${index}].total`}>
                              {index < 1 && (
                                <label htmlFor={`itemList[${index}].total`}>
                                  Total
                                </label>
                              )}
                              <Field
                                type="number"
                                name={`itemList[${index}].total`}
                                disabled
                                value={
                                  Number(values.itemList[index].qty) *
                                  Number(values.itemList[index].price)
                                }
                              />
                              <ErrorMessage
                                name={`itemList[${index}].total`}
                                component="p"
                              />
                            </div>
                            {itemList.length > 1 && (
                              <img
                                src="/assets/icon-delete.svg"
                                className={`item-delete${index}`}
                                alt="delete item"
                                onClick={() => remove(index)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <button
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
              onClick={(e) => {
                e.preventDefault();
                handleUpdateInvoice(data.id);
              }}
            >
              Save Changes
            </button>
          </section>
        </Form>
      )}
    </>
  );
};

export default NewInvoiceModal;
