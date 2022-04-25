import { StyledSidebar } from "../styles/Sidebar.styled";
import { FiLogIn } from "react-icons/fi";

const Sidebar = () => {
  return (
    <StyledSidebar>
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="" />
      </div>
      <div className="login-container">
        <button>
          <FiLogIn className="login-icon" />
        </button>
      </div>
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
