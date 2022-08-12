import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./integrate.module.css";
import { signInWithPopup, FacebookAuthProvider, signOut} from "firebase/auth";
import { auth } from "./firebase-config";

const Integrate = ({ callBack }) => {
  const navigate = useNavigate();
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user.providerData[0]);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        callBack(
          user.providerData[0].displayName,
          user.providerData[0].email,
          user.providerData[0].photoURL
        );
        navigate("/disconnect");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  return (
    <>
      <div className={styles.integrationbox}>
        <div className={styles.integratecontent}>
          <div className={styles.title}>Facebook Page Integration</div>
          <button className={styles.connect} onClick={signInWithFacebook}>
            Connect Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Integrate;
