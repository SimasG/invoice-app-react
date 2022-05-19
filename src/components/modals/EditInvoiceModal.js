// import { StyledEditInvoiceModal } from "../../styles/modals/EditInvoiceModal.styled";
import { StyledInvoiceModal } from "../../styles/modals/InvoiceModal.styled";
import { v4 as uuidv4 } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
// import EditFormikForm from "../form/EditFormikForm";
import FormikForm from "../form/FormikForm";

const EditInvoiceModal = () => {
  const [data, setData] = useState();
  const invoices = useFetchInvoices();

  const params = useParams();

  const getInvoice = (id) => {
    return invoices.find((invoice) => invoice.id === id);
  };

  const selectedInvoice = getInvoice(params.id);

  //   Populating the invoice state with selected invoice data
  useEffect(() => {
    if (!selectedInvoice) return;
    setData({
      ...selectedInvoice,
      invoiceDate: new Date(
        dayjs.unix(selectedInvoice.invoiceDate.seconds).format("DD-MMM-YYYY")
      ),
      paymentTerms: selectedInvoice.paymentTerms,
    });
  }, [selectedInvoice, setData]);

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
        qty: Yup.string().required("Qty is Required!"),
        price: Yup.string().required("Price is Required!"),
      })
    ),
  });

  return (
    <>
      <StyledInvoiceModal className="new-invoice-modal-overlay">
        <Formik
          // !!! If the invoice # is found in the database, use that data, if not, use initialValues object
          initialValues={data || initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => {
            // return <EditFormikForm data={data} />;
            return <FormikForm />;
          }}
        </Formik>
      </StyledInvoiceModal>
    </>
  );
};

export default EditInvoiceModal;
