import { ErrorMessage, Field, FieldArray, Form, useFormik } from "formik";
import FormikControl from "./FormikControl";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const FormikForm = ({ data, setData }) => {
  let navigate = useNavigate();

  const dropdownOptions = [
    { key: "Select Payment Terms", value: "" },
    { key: "Net 1 Day", value: "net1day" },
    { key: "Net 7 Days", value: "net7days" },
    { key: "Net 14 Days", value: "net14days" },
    { key: "Net 30 Days", value: "net30days" },
  ];

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

  const formik = useFormik({});

  // console.log(formik.values);

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
            placeholder="Pick a Date"
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
              const { values, setFieldValue, handleChange } = form;
              const { itemList } = values;
              // console.log(fieldArrayProps);
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
                            onChange={(e) => {
                              handleChange(e);
                              const total =
                                itemList[index].price * itemList[index].qty;
                              setFieldValue(`itemList[${index}].total`, total);
                            }}
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
                            onChange={(e) => {
                              handleChange(e);
                              const total =
                                itemList[index].price * itemList[index].qty;
                              setFieldValue(`itemList[${index}].total`, total);
                            }}
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
                            value={itemList[index].price * itemList[index].qty}
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
            disabled={!formik.isValid}
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
            disabled={!formik.isValid}
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
};

export default FormikForm;
