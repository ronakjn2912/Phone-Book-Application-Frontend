import React, { useEffect, useState } from "react";
import classes from "./Register.module.css";
import { registerAsync } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { status, registerResponse } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{5,}$/;
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (passwordPattern.test(event.target.value)) {
      setPasswordBorderColor("green");
    } else {
      setPasswordBorderColor("red");
    }
  };

  const credentialChecker = () => {
    if (passwordBorderColor === "red" && username.length <= 10) {
      return true;
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const userCredentials = {
      email,
      username,
      password,
    };
    dispatch(registerAsync(userCredentials));
    setShowMessage(true);
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/login");
    }
  }, [status]);
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // Display message for 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [showMessage]);
  return (
    <>
      <Navbar loginPageStatus={true} />
      <div className={classes.registerContainer}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div >
            <label className={classes.label}>Email</label>
            <input
              className={classes.input}
              type="email"
              value={email}
              onChange={emailHandler}
              required
            />
          </div>

          <div >
            <label className={classes.label}>Username</label>
            <input
              className={classes.input}
              type="text"
              value={username}
              onChange={usernameHandler}
              max={10}
              required
            />
          </div>

          <div className={classes.password}>
            <label className={classes.label}>Password</label>
            <input
              className={classes.input}
              type="password"
              value={password}
              onChange={passwordHandler}
              min={5}
              style={{ borderColor: passwordBorderColor }}
              required
            />
            <span
              style={{
                display: passwordBorderColor === "red" ? "block" : "none",
              }}
            >
              Password should contain minimum 5 characters, with atleast one
              uppercase letter and a special symbol
            </span>
          </div>

          <button
            className={classes.button}
            type="submit"
            disabled={credentialChecker()}
          >
            Submit
          </button>
          {showMessage && registerResponse && (
            <span className={classes.warning}>{registerResponse}</span>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
