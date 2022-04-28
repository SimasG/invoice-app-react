import GlobalStyles from "./styles/Global";
import { ThemeProvider } from "styled-components";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Invoice from "./components/Invoice";
import NewInvoiceModal from "./components/NewInvoiceModal";
import DeleteInvoiceModal from "./components/DeleteInvoiceModal";
import { Routes, Route } from "react-router-dom";
import AuthModal from "./components/AuthModal";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

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
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/:clientName/:id" element={<Invoice />}></Route>
        <Route path="/newInvoice" element={<NewInvoiceModal />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "5rem 5rem 5rem 15rem" }}>
              <h1 style={{ fontSize: "4rem" }}>There's nothing here!</h1>
            </main>
          }
        />
      </Routes>
      <AuthModal />
      <Toaster />
      {/* <NewInvoiceModal /> */}
      {/* <DeleteInvoiceModal /> */}
    </ThemeProvider>
  );
}

export default App;
