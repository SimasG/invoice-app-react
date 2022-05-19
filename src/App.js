import GlobalStyles from "./styles/Global";
import { ThemeProvider } from "styled-components";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Invoice from "./components/Invoice";
import NewInvoiceModal from "./components/modals/NewInvoiceModal";
import DeleteInvoiceModal from "./components/modals/DeleteInvoiceModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthModal from "./components/modals/AuthModal";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "./firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import EditInvoiceModal from "./components/modals/EditInvoiceModal";

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {currentUser && (
        <>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/newInvoice" element={<NewInvoiceModal />} />
            <Route path="/:clientName/:id" element={<Invoice />} />
            <Route
              path="/:clientName/:id/edit"
              element={<EditInvoiceModal />}
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
