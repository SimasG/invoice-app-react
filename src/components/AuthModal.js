import { useState } from "react";
import { StyledAuthModal } from "./styles/AuthModal.styled";
import { MdOutlineEmail } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { signInWithGoogle, emailMagicLink } from "../firebase-config";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

function AuthModal() {
  const [userEmail, setUserEmail] = useState("");

  const removeModal = () => {
    document.querySelector(".auth-modal-container").style.display = "none";
    document.querySelector(".email-input").style.display = "none";
    document.querySelector(".send-email-link-btn").style.display = "none";
    document.querySelector(".email-input").value = "";
  };

  const modalClick = (e) => {
    e.stopPropagation();
  };

  const signInWithEmail = () => {
    emailMagicLink(userEmail);
    document.querySelector(".email-input").value = "";
  };

  return (
    <StyledAuthModal onClick={removeModal} className="auth-modal-container">
      <div onClick={modalClick} className="auth-modal">
        <button className="auth-btn auth-btn-google">
          <BsGoogle />
          <span
            onClick={() => {
              signInWithGoogle();
              removeModal();
            }}
          >
            Sign In With Google
          </span>
        </button>
        <button
          onClick={() => {
            document.querySelector(".email-input").style.display = "block";
            document.querySelector(".send-email-link-btn").style.display =
              "block";
          }}
          className="auth-btn auth-btn-email"
        >
          <MdOutlineEmail />
          <span>Sign In With Email</span>
        </button>
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          className="email-input"
          type="email"
          placeholder="Email *"
        />
        <button
          onClick={signInWithEmail}
          className="auth-btn send-email-link-btn"
        >
          Send Link
        </button>
      </div>
    </StyledAuthModal>
  );
}

export default AuthModal;
