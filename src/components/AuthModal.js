import { useState } from "react";
import { StyledAuthModal } from "../styles/AuthModal.styled";
import { MdOutlineEmail } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { signInWithGoogle, emailMagicLink } from "../firebase";
// import {
//   getAuth,
//   sendSignInLinkToEmail,
//   isSignInWithEmailLink,
//   signInWithEmailLink,
// } from "firebase/auth";

function AuthModal() {
  const [userEmail, setUserEmail] = useState("");
  const [emailLogin, setEmailLogin] = useState(false);

  const removeModal = () => {
    document.querySelector(".auth-modal-container").style.display = "none";
    document.querySelector(".email-input").style.display = "none";
    document.querySelector(".send-email-link-btn").style.display = "none";
    document.querySelector(".email-input").value = "";
    setEmailLogin(false);
  };

  //   const signInWithEmail = () => {
  //     emailMagicLink(userEmail);
  //     document.querySelector(".email-input").value = "";
  //   };

  return (
    <StyledAuthModal onClick={removeModal} className="auth-modal-container">
      <div onClick={(e) => e.stopPropagation()} className="auth-modal">
        <button className="auth-btn auth-btn-google">
          <BsGoogle />
          <span
          // onClick={() => {
          //   signInWithGoogle();
          //   removeModal();
          // }}
          >
            Sign In With Google
          </span>
        </button>
        <button
          onClick={() => setEmailLogin(!emailLogin)}
          className="auth-btn auth-btn-email"
        >
          <MdOutlineEmail />
          <span>Sign In With Email</span>
        </button>
        {emailLogin && (
          <>
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              className="email-input"
              type="email"
              placeholder="Email"
              required
            />
            <button
              //   onClick={signInWithEmail}
              className="auth-btn send-email-link-btn"
            >
              Send Link
            </button>
          </>
        )}
      </div>
    </StyledAuthModal>
  );
}

export default AuthModal;
