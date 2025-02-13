import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { loginAsync } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loginBtnClicked, setLoginBtnClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, accessToken, loginResponse } = useSelector(
    (state) => state.user
  );
  const loginHandler = (event) => {
    event.preventDefault();
    const loginCredentials = {
      username: enteredUsername,
      password: enteredPassword,
    };
    setLoginBtnClicked(true);
    dispatch(loginAsync(loginCredentials));
    // navigate("/WelcomeBack"); -> use useEffect to navigate once status is fulfilled
  };

  useEffect(() => {
    if (status === "fulfilled" && accessToken && loginBtnClicked) {
      console.log("log-in");
      sessionStorage.setItem("user-token", accessToken);
      navigate("/WelcomeBack");
    }
  }, [status, accessToken]);
  const nameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <React.Fragment>
      <Navbar loginPageStatus={true} />
      <div className={classes.container}>
        <form className={classes.loginForm} onSubmit={loginHandler}>
          <h2>Login</h2>
          {loginResponse && (
            <span className={classes.warnMessage}>{loginResponse}</span>
          )}
          <div className="input-group">
            <label className={classes.label}>Username*</label>
            <input
              className={classes.input}
              type="text"
              id="username"
              name="username"
              value={enteredUsername}
              onChange={nameChangeHandler}
              required
            />
          </div>
          <div className="input-group">
            <label className={classes.label}>Password*</label>
            <input
              className={classes.input}
              type="password"
              id="password"
              name="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <button
            className={classes.button}
            type="submit"
            disabled={!enteredPassword || !enteredUsername}
          >
            Login
          </button>
          <p>
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
