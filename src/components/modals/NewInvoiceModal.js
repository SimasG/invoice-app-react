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
import FormikForm from "../form/FormikForm";

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
  const [total, setTotal] = useState("");

  // Pure cancer. Need to find a way to sync formErrors state when submitting the form.
  const [formErrors, setFormErrors] = useState({ fromDataStreetAddress: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const dropdownOptions = [
    { key: "Select Payment Terms", value: "" },
    { key: "Net 1 Day", value: "1" },
    { key: "Net 7 Days", value: "7" },
    { key: "Net 14 Days", value: "14" },
    { key: "Net 30 Days", value: "30" },
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
    // setFormErrors(validateOld(data));
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

  return (
    <>
      {data && (
        <StyledNewInvoiceModal className="new-invoice-modal-overlay">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              // console.log(formik.values.itemList);
              return <FormikForm data={data} setData={setData} />;
            }}
          </Formik>
        </StyledNewInvoiceModal>
      )}
    </>
  );
};

export default NewInvoiceModal;
