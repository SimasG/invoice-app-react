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

1. Make sure that whenever qty/price is changed, the onChange runs for total as well
