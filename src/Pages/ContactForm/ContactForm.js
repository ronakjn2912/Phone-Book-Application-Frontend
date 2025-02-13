import React, { useState } from "react";
import classes from "./ContactForm.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addContactAsync } from "../../features/contact/contactSlice";
const ContactForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    date: "",
    phone: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const newContact = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      date: new Date(contact.date),
      cgroup: contact.cgroup,
      favorite : false
    };
    dispatch(addContactAsync(newContact));

    navigate("/WelcomeBack");
    setContact(() => {
      return {
        name: "",
        email: "",
        phone: "",
        date: "",
        cgroup: "",
      };
    });
  };

  const resetHandler = () => {
    setContact(() => {
      return {
        name: "",
        email: "",
        phone: "",
        date: "",
        cgroup: "",
      };
    });
  };

  const cancelHandler = () => {
    setContact(() => {
      return {
        name: "",
        email: "",
        phone: "",
        date: "",
        cgroup: "",
      };
    });
    navigate("/WelcomeBack");
  };

  const nameHandler = (event) => {
    setContact((prevState) => {
      return {
        ...prevState,
        name: event.target.value,
      };
    });
  };
  const emailHandler = (event) => {
    setContact((prevState) => {
      return {
        ...prevState,
        email: event.target.value,
      };
    });
  };
  const phoneHandler = (event) => {
    setContact((prevState) => {
      return {
        ...prevState,
        phone: event.target.value,
      };
    });
  };
  const dateHandler = (event) => {
    setContact((prevState) => {
      return {
        ...prevState,
        date: event.target.value,
      };
    });
  };

  const cgroupHandler = (event) => {
    setContact((prevState) => {
      return {
        ...prevState,
        cgroup: event.target.value,
      };
    });
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <Navbar
        loginPageStatus={true}
        loggedIn={true}
        onLogout={onLogoutHandler}
      />
      <div className={classes.formdata}>
        <form
          className={classes.form}
          onSubmit={submitHandler}
          onReset={resetHandler}
        >
          <div>
            <label className={classes.label}>
              Name
              <input
                className={classes.input}
                type="text"
                name="name"
                value={contact.name}
                onChange={nameHandler}
                placeholder="Enter your full name"
                required
              ></input>
            </label>

            <label className={classes.label}>
              Email
              <input
                className={classes.input}
                type="email"
                name="email"
                value={contact.email}
                onChange={emailHandler}
                placeholder="Enter e-mail id"
              ></input>
            </label>
          </div>

          <div>
            <label className={classes.label}>
              Date
              <input
                className={classes.input}
                type="date"
                name="date"
                value={contact.date}
                onChange={dateHandler}
                required
              ></input>
            </label>
            <div>
              <label className={classes.label}>
                Phone
                <input
                  className={classes.input}
                  type="number"
                  name="phone"
                  value={contact.phone}
                  onChange={phoneHandler}
                  placeholder="Enter 10 digit contact no."
                  required
                ></input>
              </label>
            </div>
            {contact.phone.length > 10 && (
              <span className={classes.alert}>
                Mobile Number should be 10 digit
              </span>
            )}
          </div>

          <div>
            <label className={classes.label}>
              Contact Group
              <select
                className={classes.cgroupSelect}
                name="cgroup"
                onChange={cgroupHandler}
                required
              >
                <option value="" selected>
                  Select Contact Group
                </option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Others">Others</option>
              </select>
            </label>
          </div>

          <div className={classes.buttons}>
            <button className={classes.reset} type="reset">
              Reset
            </button>

            <button
              className={classes.cancel}
              onClick={cancelHandler}
            >
              Cancel
            </button>

            <button
              className={classes.submit}
              type="submit"
              disabled={contact.phone.length !== 10}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
