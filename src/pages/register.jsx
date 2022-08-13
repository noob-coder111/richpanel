import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./register.module.css";
import { auth } from "./firebase-config";

const Register = () => {
  const [active, setActive] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const [user, setUser] = useState({});

  const handleRemember = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setLogEmail(user.email);
    setLogPassword(user.password);
  };

  const handleRegister = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        regEmail,
        regPassword
      );
      console.log(newUser);
      alert("You have successfully Signed up!");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogin = async () => {
    try {
      const newUser = await signInWithEmailAndPassword(
        auth,
        logEmail,
        logPassword
      );
      console.log(newUser);
      navigate("/fbintegrate");
    } catch (error) {
      alert(error.message);
    }
  };

  const navigate = useNavigate();

  const [accountState, setAccountState] = useState("signup");
  return (
    <div className={styles.box}>
      {accountState === "signup" ? (
        <div className={styles.content1}>
          <div className={styles.heading}>Create Account</div>
          <div className={styles.input}>
            <div className={styles.title}>Name</div>
            <input
              className={styles.inputbox}
              placeholder="Enter your Name"
              type="text"
              onChange={(e) => {
                setRegName(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Email</div>
            <input
              className={styles.inputbox}
              placeholder="Enter Email"
              type="text"
              onChange={(e) => {
                setRegEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Password</div>
            <input
              className={styles.inputbox}
              placeholder="Enter a password"
              type="password"
              onChange={(e) => {
                setRegPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.remember}>
            <input type="checkbox" onClick={handleRemember} />
            Remember Me
          </div>
          <button className={styles.sign} onClick={handleRegister}>
            Sign Up
          </button>
          <div className={styles.existing}>
            Already have an account?
            <>
              <div>
                <button
                  className={styles.loginsignup}
                  onClick={() => {
                    setAccountState("login");
                  }}
                >
                  Login
                </button>
              </div>
            </>
          </div>
        </div>
      ) : (
        <div className={styles.content2}>
          <div className={styles.heading}>Login to your account</div>
          <div className={styles.input}>
            <div className={styles.title}>Email</div>
            <input
              className={styles.inputbox}
              placeholder="Enter Email"
              type="text"
              onChange={(e) => {
                setLogEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.title}>Password</div>
            <input
              className={styles.inputbox}
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setLogPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.remember}>
            <input type="checkbox" onClick={handleRemember} />
            Remember Me
          </div>
          <div className={styles.input}>
            <button className={styles.sign} onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className={styles.existing}>
            New to MyApp?
            <>
              <div>
                <button
                  className={styles.loginsignup}
                  onClick={() => {
                    setAccountState("signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
