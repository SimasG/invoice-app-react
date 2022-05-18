import { StyledSidebar } from "../styles/Sidebar.styled";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  const signOutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logged out!");
    });
    dispatch({ type: "LOGOUT" });
    // document.querySelector(".auth-modal-container").style.display = "flex";
  };

  return (
    <StyledSidebar>
      <Link to="/" className="logo-container">
        <div className="logo-subcontainer">
          <img src="/assets/logo.svg" alt="" />
        </div>
        <div className="logo-shadow"></div>
      </Link>
      {currentUser && (
        <Link to="/" onClick={signOutUser} className="logout-container">
          <button>
            <FiLogOut className="logout-icon" />
          </button>
          <span>Log Out</span>
        </Link>
      )}
      <div>
        <div className="theme-toggle-container">
          <img
            className="theme-toggle"
            src="/assets/icon-moon.svg"
            alt="theme toggle"
          />
        </div>
        <div className="gray-line"></div>
        {currentUser && (
          <img
            className="profile-pic"
            src={currentUser.photoURL}
            alt="profile"
          />
        )}
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
