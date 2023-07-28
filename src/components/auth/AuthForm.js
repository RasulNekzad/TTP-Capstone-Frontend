import "./AuthForm.css";
import { useContext, useRef, useState } from "react";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AuthCodeMap from "./AuthCodeMap";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleLogo from "../../assets/google.png";
import { Alert } from "react-bootstrap";
import AuthContext from "../../context/AuthProviderContext";
import axios from "axios";
import ProtectedRoute from "../protectedroute";
import useDocumentTitle from "../useDocumentTitle";

const AuthForm = ({ spotifyOAuth, onSpotifyAuthClick }) => {
  const provider = new GoogleAuthProvider();
  const { login } = useContext(AuthContext);

  const [authType, setAuthType] = useState(true);
  const [error, setError] = useState("");

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useDocumentTitle(
    authType ? "Login - Spotify Proximity" : "Register - Spotify Proximity"
  );

  const authTypeHandler = (type) => (e) => {
    setError("");
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setAuthType(type);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!authType) {
      createUserWithEmailAndPassword(
        auth,
        emailInputRef.current.value,
        passwordInputRef.current.value
      )
        .then((userCredential) => {
          onAuthStateChanged(auth, async (user) => {
            const uid = user.uid;
            login(uid);
            await axios.post(`${process.env.REACT_APP_API_URL}user/`, {
              userId: uid,
              name: nameInputRef.current.value,
              email: emailInputRef.current.value,
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(AuthCodeMap(errorCode));
        });
    } else {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(
            auth,
            emailInputRef.current.value,
            passwordInputRef.current.value
          );
        })
        .then((userCredential) => {
          const user = userCredential.user;
          login(user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(AuthCodeMap(errorCode));
        });
    }
  };

  const googleAuthHandler = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        await axios.post(`${process.env.REACT_APP_API_URL}user/`, {
          user_id: user.uid,
          display_name: user.displayName,
          email: user.email,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // const credential = GoogleAuthProvider.credentialFromError(error.data.error);
      });
  };
  const spotifyAuthHandler = () => {
    onSpotifyAuthClick(); // Trigger the callback when the Spotify button is clicked
  };

  return (
    <ProtectedRoute page="auth">
      <div className="auth">
        <div className="auth-container">
          <div className="authSelect">
            <button
              className={authType ? "active" : ""}
              onClick={authTypeHandler(true)}
            >
              Login
            </button>
            <button
              className={!authType ? "active" : ""}
              onClick={authTypeHandler(false)}
            >
              Register
            </button>
          </div>
          <form onSubmit={submitHandler} className="form">
            {error && <Alert variant="warning">{error}</Alert>}
            <p className="form__title">{authType ? "Login" : "Register"}</p>
            {!authType && (
              <div className="control">
                <input
                  ref={nameInputRef}
                  className="auth__control__input"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}
            <div className="control">
              <input
                ref={emailInputRef}
                className="auth__control__input"
                type="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="control">
              <input
                ref={passwordInputRef}
                className="auth__control__input"
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="actions__button">
              {authType ? "Login" : "Register"}
            </button>
            <hr className="auth__divider" />
            <button
              type="button"
              onClick={googleAuthHandler}
              className="button"
            >
              <img
                className="button__logo"
                src={googleLogo}
                alt="google icon"
              />
              <span className="button__text">Continue With Google</span>
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AuthForm;
