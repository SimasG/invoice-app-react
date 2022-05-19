\*\*\*CONSIDERATIONS\*\*\*

1. EDIT INVOICE ROUTING
   Should I open it via routing or nested components?

Routing:
GOOD: More proper/uniform -> would follow app's underlying routing structure
BAD: More difficult to implement (conditional rendering not working as expected)
BAD: Multiple shared state requirements

Nested Components:
GOOD: Easy to implement
GOOD: No need to share state across multiple non-nested components
BAD: Not as proper/uniform

**_QUESTIONS_**

1. How properly am I using uuids?
2. How to include more complex logic in state, like math (e.g. if qty = 2 & price = 300, then total should automatically be 2 x 300 = 600)
3. How to pre-fill invoice data in the EditInvoiceModal? Curveball: pre-filling the data for mapped items.

// useEffect(() => {
// itemList.forEach((item) => {
// let totalPrice = parseInt(item.qty) \* parseInt(item.price);
// setTotal({ total: totalPrice });
// });
// }, [itemList]);

// console.log(total);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

s
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
// errors.invoiceDate = "Invoice Date is Required!";
// }
if (!values.paymentTerms) {
errors.paymentTerms = "Payment Terms are Required!";
}
if (!values.description) {
errors.description = "Project Description is Required!";
}
// if (!values.itemList[0].itemName) {
// errors.itemList[0].itemName = "Name is Required!";
// }

    // values.itemList.forEach((item) => {
    //   if (!item.itemName) {
    //     errors.itemList[0].itemName = "Name is Required!";
    //   }
    // });
    return errors;

};

                                  // <div key={index} className="item">
                                  //   {itemListInputs.map((input) => (
                                  //     <div key={input.id}>
                                  //       {index < 1 && (
                                  //         <label htmlFor={input.id}>
                                  //           {input.label}
                                  //         </label>
                                  //       )}
                                  //       <Field
                                  //         type={input.type}
                                  //         placeholder={input.placeholder}
                                  //         name={`itemList[${index}].${input.id}`}
                                  //       />
                                  //       <ErrorMessage
                                  //         name={`itemList[${index}].${input.id}`}
                                  //         component="p"
                                  //       />
                                  //     </div>
                                  //   ))}
                                  //   {itemList.length > 1 && (
                                  //     <img
                                  //       src="/assets/icon-delete.svg"
                                  //       alt="delete item"
                                  //       onClick={() => remove(index)}
                                  //     />
                                  //   )}
                                  // </div>




                // <Form className="new-invoice-modal-container">
                //   <h1 className="title">New Invoice</h1>
                //   <section className="bill-from-container">
                //     <p className="bill-from-parapgrah">Bill From</p>
                //     <div className="from-address-container">
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Street Address"
                //         name="fromStreetAddress"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="City"
                //         name="fromCity"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Post Code"
                //         name="fromPostCode"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Country"
                //         name="fromCountry"
                //       />
                //     </div>
                //   </section>
                //   <section className="bill-to-container">
                //     <p className="bill-to-parapgrah">Bill To</p>
                //     <div className="client-info-container">
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Client's Name"
                //         name="clientName"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="email"
                //         label="Client's Email"
                //         name="clientEmail"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Street Address"
                //         name="toStreetAddress"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="City"
                //         name="toCity"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Post Code"
                //         name="toPostCode"
                //       />
                //       <FormikControl
                //         control="input"
                //         type="text"
                //         label="Country"
                //         name="toCountry"
                //       />
                //     </div>
                //     <div className="invoice-info-container">
                //       <FormikControl
                //         control="date"
                //         label="Invoice Date"
                //         name="invoiceDate"
                //         placeholder="Pick a Date"
                //       />
                //       <FormikControl
                //         control="select"
                //         label="Payment Terms"
                //         name="paymentTerms"
                //         options={dropdownOptions}
                //       />
                //     </div>
                //     <div className="project-description-container">
                //       <label htmlFor="description">Project Description</label>
                //       <Field
                //         type="text"
                //         placeholder="Project Description"
                //         name="description"
                //       />
                //       <ErrorMessage name="description" component="p" />
                //     </div>
                //   </section>
                //   <section className="item-list-container">
                //     <h2>Item List</h2>
                //     <div className="item-list-input-table">
                //       <FieldArray name="itemList">
                //         {(fieldArrayProps) => {
                //           const { push, remove, form } = fieldArrayProps;
                //           const { values, setFieldValue, handleChange } = form;
                //           const { itemList } = values;
                //           // console.log(fieldArrayProps);
                //           return (
                //             <>
                //               <div className="item-list-input-table-subcontainer">
                //                 {itemList.map((item, index) => (
                //                   // Wny can't I use <FormikControl> here?
                //                   <div key={item.uid} className="item">
                //                     <div key={`itemList[${index}].itemName`}>
                //                       {index < 1 && (
                //                         <label
                //                           htmlFor={`itemList[${index}].itemName`}
                //                         >
                //                           Item Name
                //                         </label>
                //                       )}
                //                       <Field
                //                         type="text"
                //                         name={`itemList[${index}].itemName`}
                //                       />
                //                       <ErrorMessage
                //                         name={`itemList[${index}].itemName`}
                //                         component="p"
                //                       />
                //                     </div>
                //                     <div key={`itemList[${index}].qty`}>
                //                       {index < 1 && (
                //                         <label
                //                           htmlFor={`itemList[${index}].qty`}
                //                         >
                //                           Qty
                //                         </label>
                //                       )}
                //                       <Field
                //                         type="number"
                //                         name={`itemList[${index}].qty`}
                //                         onChange={(e) => {
                //                           handleChange(e);
                //                           const total =
                //                             itemList[index].price *
                //                             itemList[index].qty;
                //                           // "setFieldValue" uses the old state of qty
                //                           setFieldValue(
                //                             `itemList[${index}].total`,
                //                             total
                //                           );
                //                         }}
                //                         value={itemList[index].qty}
                //                       />
                //                       <ErrorMessage
                //                         name={`itemList[${index}].qty`}
                //                         component="p"
                //                       />
                //                     </div>
                //                     <div key={`itemList[${index}].price`}>
                //                       {index < 1 && (
                //                         <label
                //                           htmlFor={`itemList[${index}].price`}
                //                         >
                //                           Price
                //                         </label>
                //                       )}
                //                       <Field
                //                         type="number"
                //                         name={`itemList[${index}].price`}
                //                         onChange={(e) => {
                //                           handleChange(e);
                //                           const total =
                //                             itemList[index].price *
                //                             itemList[index].qty;
                //                           setFieldValue(
                //                             `itemList[${index}].total`,
                //                             total
                //                           );
                //                         }}
                //                         value={itemList[index].price}
                //                       />
                //                       <ErrorMessage
                //                         name={`itemList[${index}].price`}
                //                         component="p"
                //                       />
                //                     </div>
                //                     <div key={`itemList[${index}].total`}>
                //                       {index < 1 && (
                //                         <label
                //                           htmlFor={`itemList[${index}].total`}
                //                         >
                //                           Total
                //                         </label>
                //                       )}
                //                       <Field
                //                         type="number"
                //                         name={`itemList[${index}].total`}
                //                         value={
                //                           itemList[index].price *
                //                           itemList[index].qty
                //                         }
                //                       />
                //                       <ErrorMessage
                //                         name={`itemList[${index}].total`}
                //                         component="p"
                //                       />
                //                     </div>
                //                     {itemList.length > 1 && (
                //                       <img
                //                         src="/assets/icon-delete.svg"
                //                         className={`item-delete${index}`}
                //                         alt="delete item"
                //                         onClick={() => remove(index)}
                //                       />
                //                     )}
                //                   </div>
                //                 ))}
                //               </div>
                //               <button
                //                 // If type is not specified, Formik will assume type is "submit" and try to submit the form
                //                 type="button"
                //                 className="add-new-item-btn"
                //                 onClick={() =>
                //                   push({
                //                     uid: uuidv4(),
                //                     itemName: "",
                //                     price: "",
                //                     qty: "",
                //                     total: "",
                //                   })
                //                 }
                //               >
                //                 + Add New Item
                //               </button>
                //             </>
                //           );
                //         }}
                //       </FieldArray>
                //     </div>
                //   </section>
                //   <section className="new-invoice-btn-container">
                //     <button
                //       type="button"
                //       className="discard-btn"
                //       onClick={() => {
                //         resetData();
                //         navigate("/");
                //       }}
                //     >
                //       Discard
                //     </button>
                //     <div className="save-btn-container">
                //       <button
                //         type="submit"
                //         className="save-draft-btn"
                //         disabled={!formik.isValid}
                //         // onClick={(e) => {
                //         //   e.preventDefault();
                //         //   handleAddNewInvoice("Draft");
                //         // }}
                //       >
                //         Save as Draft
                //       </button>
                //       <button
                //         type="submit"
                //         className="save-send-btn"
                //         disabled={!formik.isValid}
                //         // onClick={(e) => {
                //         //   e.preventDefault();
                //         //   handleAddNewInvoice("Pending");
                //         // }}
                //       >
                //         Save & Send
                //       </button>
                //     </div>
                //   </section>
                // </Form>

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

/
/
/

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

/
/
/

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

/
/
/

document.querySelectorAll(".option").forEach((option) => {
option.addEventListener("click", () => {
document.querySelector(".selected").innerHTML =
option.querySelector("label").innerHTML;
document.querySelector(".options-container").classList.remove("active");
});
});

/
/
/

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

/
/
/

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

/
/
/

// Moving invoice state up
const [data, setData] = useState({
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

/
/
/
/

        /* .payment-terms-container {
          .payment-terms-select-box {
            display: flex;
            flex-direction: column;
            width: 24rem;
            cursor: pointer;
            .options-container {
              max-height: 0;
              opacity: 0;
              background-color: #c8c5c5;
              border-radius: 8px;
              overflow: hidden;
              order: 1;
              .option {
                padding: 1.55rem 2.4rem;
                cursor: pointer;
                :hover {
                  background-color: ${(props) => props.theme.colors.whisperBg};
                }
                .radio {
                  display: none;
                }
                label {
                  display: inline;
                  color: ${(props) => props.theme.colors.vulcan};
                  cursor: pointer;
                  :hover {
                    color: ${(props) => props.theme.colors.cornflowerBlue};
                  }
                }
              }
            }
            .options-container.active {
              max-height: 19.1rem;
              opacity: 1;
            }
            .options-container.active + .selected::after {
              transform: rotateX(180deg);
              top: -2rem;
            }
            .selected {
              padding: 1.55rem 2.4rem;
              border-radius: 8px;
              border: 1px solid ${(props) => props.theme.colors.selago};
              position: relative;
              order: 0;
              ::after {
                content: "";
                background-image: url("/assets/icon-arrow-down.svg");
                background-size: contain;
                background-repeat: no-repeat;
                position: absolute;
                height: 100%;
                width: 1rem;
                top: 2rem;
                right: 1.4rem;
                transition: 0.4s all;
              }
              :focus,
              :active {
                border: 1px solid
                  ${(props) => props.theme.colors.cornflowerBlue};
              }
            }
            .selected.margin-bottom {
              margin-bottom: 2.4rem;
            }
            p {
              color: red;
              font-size: 1rem;
            }
          }
        } */

/
/
/
/
/
