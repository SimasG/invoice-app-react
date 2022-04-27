import { useContext, useState } from "react";
import { StyledAuthModal } from "../styles/AuthModal.styled";
import { MdOutlineEmail } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  //   sendSignInLinkToEmail,
  //   isSignInWithEmailLink,
  //   signInWithEmailLink,
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

function AuthModal() {
  const [userEmail, setUserEmail] = useState("");
  const [emailLogin, setEmailLogin] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    // Google sign up/in
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Don't understand the payload bit here. Does it pass in the "user" value from here to "currentUser"
        // in the "INITIAL_STATE"?
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const removeModal = () => {
    document.querySelector(".auth-modal-container").style.display = "none";
    setEmailLogin(false);
    setUserEmail("");
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
            onClick={() => {
              handleGoogleLogin();
              removeModal();
            }}
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
          <form>
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              className="email-input"
              type="email"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              //   onClick={signInWithEmail}
              className="auth-btn send-email-link-btn"
            >
              Send Link
            </button>
          </form>
        )}
      </div>
    </StyledAuthModal>
  );
}

export default AuthModal;
