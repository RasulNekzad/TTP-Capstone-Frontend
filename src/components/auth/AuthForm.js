import './AuthForm.css';
import {useContext, useRef, useState} from "react";
import {
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth} from "../../firebaseConfig";
import AuthCodeMap from "./AuthCodeMap";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import googleLogo from '../../assets/google.png'
import {Alert} from "react-bootstrap";
import AuthContext from "../../context/AuthProviderContext";

const AuthForm = (props) => {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const [authType, setAuthType] = useState(true);
    const [error, setError] = useState('');

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authTypeHandler = type => e => {
        setError('');
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        if (!authType) {
            createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value).then((userCredential) => {
                onAuthStateChanged(auth, (user) => {
                    const uid = user.uid;
                    login(uid);
                })
                navigate('/');
            }).catch((error) => {
                const errorCode = error.code;
                setError(AuthCodeMap(errorCode));
            })
        } else {
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value);
                }).then((userCredential) => {
                const user = userCredential.user;
                login(user.uid);
                navigate('/');
            }).catch((error) => {
                const errorCode = error.code;
                setError(AuthCodeMap(errorCode));
            })
        }
    }

    const googleAuthHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate('/');
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="authSelect">
                    <button className={(authType ? "active" : '')}
                            onClick={authTypeHandler(true)}>Login
                    </button>
                    <button className={(!authType ? "active" : '')}
                            onClick={authTypeHandler(false)}>Register
                    </button>
                </div>
                <form onSubmit={submitHandler} className="form">
                    {error && <Alert variant="warning">{error}</Alert>}
                    <p className="form__title">{authType ? 'Login' : 'Register'}</p>
                    {!authType && (
                        <div className="control">
                            <input className="control__input" type="text" id="name" placeholder="Full Name" required/>
                        </div>
                    )}
                    <div className="control">
                        <input ref={emailInputRef} className="control__input" type="email" id="email"
                               placeholder="Email"
                               required/>
                    </div>
                    <div className="control">
                        <input ref={passwordInputRef} className="control__input" type="password" id="password"
                               placeholder="Password" required/>
                    </div>
                    <button className="actions__button">{authType ? 'Login' : 'Register'}</button>
                    <hr className="divider"/>
                    <button type="button" onClick={googleAuthHandler} className="button">
                        <img className="button__logo" src={googleLogo} alt="google icon"/>
                        <span className="button__text">Continue With Google</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthForm;