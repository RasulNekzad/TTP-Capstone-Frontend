import './UserProfile.css';
import spotifyLogo from "../../assets/spotify.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getAuth, updatePassword, deleteUser} from "firebase/auth";
import {fetchSpotifyOAuthThunk, fetchUserProfileThunk} from "../../redux/user/user.actions";
import {useDispatch, useSelector} from "react-redux";
import ProtectedRoute from "../protectedroute";

function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.user);

    const [showResetPw, setShowResetPw] = useState(false);
    const passwordInputRef = useRef();

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user && user.uid) {
            retrieveUserHandler();
        }
    }, [user.uid])

    // Fetch user profile from database
    const retrieveUserHandler = async () => {
        await dispatch(fetchUserProfileThunk(user.uid));
    }

    const resetPwHandler = () => {
        setShowResetPw(!showResetPw);
    }

    const linkSpotifyHandler = () => {
        dispatch(fetchSpotifyOAuthThunk());
    }

    const changePasswordHandler = () => {
        updatePassword(user, passwordInputRef.current.value).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
        });
        setShowResetPw(false);
    }

    const deleteAccountHandler = () => {
        console.log("Are you sure you want to delete your account?")
        // IMPLEMENT DELETE ACCOUNT FUNCTIONALITY HERE
        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
        navigate('/');
    }

    return (
        <ProtectedRoute>
            <div className="main">
                <div className="container">
                    <h1>User Profile</h1>
                    <div className="profile">
                        {profile && profile.profile_image_url !== null ? (
                            <img className="profile__pic" src={profile.profile_image_url} alt="User Profile" />
                        ) : (
                            <img className="profile__pic" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Default Profile" />
                        )}
                        <div>
                            <h1 className="profile__name">{profile.display_name}</h1>
                            <button onClick={resetPwHandler} className="reset__button">Reset Your Password?</button>
                            {showResetPw &&
                                <div className="reset__pw">
                                    <input ref={passwordInputRef} className="control__input" type="password"
                                           id="password"
                                           placeholder="Password" required/>
                                    <button onClick={changePasswordHandler} className="submit__button">Submit</button>
                                </div>
                            }
                        </div>
                    </div>
                    <hr className="divider"/>
                    <div className="profile__spotify">
                        <h1 className="spotify__text">Want to share what you're listening to with the world?</h1>
                        <button type="button" onClick={linkSpotifyHandler} className="spotify__button">
                            <img className="button__logo" src={spotifyLogo} alt="spotify icon"/>
                            <span className="button__text">Connect To Spotify</span>
                        </button>
                    </div>
                    <hr className="divider"/>
                    <div>
                        <button onClick={deleteAccountHandler} type="button" className="delete__button">
                            <span>Close Account</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="divider" />
            <div className="profile__spotify">
              <h1 className="spotify__text">
                Want to share what you're listening to with the world?
              </h1>
                <button
                  type="button"
                  onClick={linkSpotifyHandler}
                  className="spotify__button"
                >
                  <img
                    className="button__logo"
                    src={spotifyLogo}
                    alt="spotify icon"
                  />
                  <span className="button__text">Connect To Spotify</span>
                </button>
            </div>
            <hr className="divider" />
            <div>
              <button
                onClick={deleteAccountHandler}
                type="button"
                className="delete__button"
              >
                <span>Close Account</span>
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
}

export default UserProfile;