import { StyledNewInvoiceModal } from "../../styles/modals/NewInvoiceModal.styled";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import NewFormikForm from "../form/NewFormikForm";

const NewInvoiceModal = () => {
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
        price: 0,
        qty: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    fromStreetAddress: Yup.string().required("Street Address is Required!"),
    fromCity: Yup.string().required("City is Required!"),
    fromPostCode: Yup.string().required("Post Code is Required!"),
    fromCountry: Yup.string().required("Country is Required!"),
    clientName: Yup.string().required("Name is Required!"),
    clientEmail: Yup.string()
      .email("Invalid Email!")
      .required("Email is Required!"),
    toStreetAddress: Yup.string().required("Street Address is Required!"),
    toCity: Yup.string().required("City is Required!"),
    toPostCode: Yup.string().required("Post Code is Required!"),
    toCountry: Yup.string().required("Country is Required!"),
    invoiceDate: Yup.date().required("Invoice Date is Required!").nullable(),
    paymentTerms: Yup.string().required("Payment Terms are Required!"),
    description: Yup.string().required("Project Description is Required!"),
    itemList: Yup.array().of(
      Yup.object({
        itemName: Yup.string().required("Name is Required!"),
        qty: Yup.string().required("Required!"),
        price: Yup.string().required("Price is Required!"),
      })
    ),
  });

  return (
    <>
      <StyledNewInvoiceModal className="new-invoice-modal-overlay">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return <NewFormikForm />;
          }}
        </Formik>
      </StyledNewInvoiceModal>
    </>
  );
};

export default NewInvoiceModal;
