import GlobalStyles from "./styles/Global";
import { ThemeProvider } from "styled-components";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Invoice from "./components/Invoice";
import NewInvoiceModal from "./components/modals/NewInvoiceModal";
import DeleteInvoiceModal from "./components/modals/DeleteInvoiceModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthModal from "./components/modals/AuthModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "./firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import EditInvoiceModal from "./components/modals/EditInvoiceModal";
import { v4 as uuidv4 } from "uuid";

const theme = {
  colors: {
    cornflowerBlue: "#7C5DFA",
    heliotrope: "#9277FF",
    mirage: "#1E2139",
    ebonyClay: "#252945",
    selago: "#DFE3FA",
    baliHai: "#888EB0",
    shipCove: "#7E88C3",
    vulcan: "#0C0E16",
    burntSienna: "#EC5757",
    wewak: "#F29696",
    whisperBg: "#F8F8FB",
    mirage2: "#141625",
  },
};

function App() {
  const { currentUser, dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  // Checking if user entered the app via the magic link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          const user = result.user;
          dispatch({ type: "LOGIN", payload: user });
          await setDoc(doc(db, "users", result.user.uid), {
            email: result.user.email,
            timeStamp: serverTimestamp(),
          });
          // window.localStorage.removeItem("emailForSignIn");
          toast.success("Logged in!");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {currentUser && (
        <>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              path="/newInvoice"
              element={<NewInvoiceModal data={data} setData={setData} />}
            />
            <Route
              path="/:clientName/:id"
              element={<Invoice data={data} setData={setData} />}
            />
            <Route
              path="/:clientName/:id/edit"
              element={<EditInvoiceModal data={data} setData={setData} />}
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "5rem 5rem 5rem 15rem" }}>
                  <h1 style={{ fontSize: "4rem" }}>There's nothing here!</h1>
                </main>
              }
            />
          </Routes>
        </>
      )}
      {!currentUser && <AuthModal />}
      <Toaster />
      {/* <NewInvoiceModal /> */}
      {/* <DeleteInvoiceModal /> */}
    </ThemeProvider>
  );
}

export default App;
