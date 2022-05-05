import { useContext, useState } from "react";
import { StyledAuthModal } from "../../styles/modals/AuthModal.styled";
import { MdOutlineEmail } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { auth, actionCodeSettings, db } from "../../firebase";
import {
  // Google auth
  GoogleAuthProvider,
  signInWithPopup,
  // Passwordless auth
  sendSignInLinkToEmail,
} from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function AuthModal() {
  const [userEmail, setUserEmail] = useState("");
  const [emailLogin, setEmailLogin] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const removeModal = () => {
    document.querySelector(".auth-modal-container").style.display = "none";
    setEmailLogin(false);
    setUserEmail("");
  };

  // Google auth
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // Don't understand the payload bit here. Does it pass in the "user" value from here to "currentUser"
        // in the "INITIAL_STATE"?
        dispatch({ type: "LOGIN", payload: user });
        await setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          timeStamp: serverTimestamp(),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Passwordless auth
  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, userEmail, actionCodeSettings)
      .then(() => {
        toast.success("Email sent! Check your inbox.");
        window.localStorage.setItem("emailForSignIn", userEmail);
      })
      .catch((err) => {
        console.log(err);
      });
    document.querySelector(".email-input").value = "";
  };

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
            />
            <button
              type="submit"
              onClick={handleSignInWithEmail}
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
