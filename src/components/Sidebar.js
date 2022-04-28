import { StyledSidebar } from "../styles/Sidebar.styled";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";

const Sidebar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  const signOutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logged out!");
    });
    dispatch({ type: "LOGOUT" });
  };

  console.log(currentUser);

  return (
    <StyledSidebar>
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="" />
      </div>
      {!currentUser && (
        <div
          className="login-container"
          onClick={() => {
            document.querySelector(".auth-modal-container").style.display =
              "flex";
          }}
        >
          <button>
            <FiLogIn className="login-icon" />
          </button>
          <span>Log In</span>
        </div>
      )}
      {currentUser && (
        <div onClick={signOutUser} className="logout-container">
          <button>
            <FiLogOut className="logout-icon" />
          </button>
          <span>Log Out</span>
        </div>
      )}
      <div>
        <div className="theme-toggle-container">
          <img className="theme-toggle" src="/assets/icon-moon.svg" alt="" />
        </div>
        <div className="gray-line"></div>
        <img className="profile-pic" src="/assets/image-avatar.jpg" alt="" />
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
