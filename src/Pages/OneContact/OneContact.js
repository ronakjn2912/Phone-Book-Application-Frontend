import React, { useEffect, useState } from "react";
import avatar from "./../../assets/avatar.png";
import Navbar from "../../components/navbar/Navbar";
import AlternateDetails from "./AlternateDetails";
import AlternateAddress from "./AlternateAddress";
import ImportantDate from "./ImportantDate";
import classes from "./OneContact.module.css";
import { LuContactRound } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import {
  addAlternateContactAsync,
  fetchContactAsync,
} from "../../features/contact/contactOneSlice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const OneContact = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const OneContact = location.state; // id,name,phone,email,date,cgroup of contact
  const [alternatePhone, setAlternatePhone] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  useEffect(() => {
    dispatch(fetchContactAsync(OneContact.id));
  }, [dispatch, OneContact.id]);
  const contactDetails = useSelector((state) => state.contactInfo.userDetails); //reads value from store
  const onLogoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  const phoneHandler = (event) => {
    setAlternatePhone(event.target.value);
  };
  const emailHandler = (event) => {
    setAlternateEmail(event.target.value);
  };
  const savePhoneHandler = () => {
    const contactInfo = {
      contactId: OneContact.id,
      detailType: "alternate phone",
      detailValue: alternatePhone,
    };
    dispatch(addAlternateContactAsync(contactInfo));
    setAlternatePhone("");
  };
  const saveEmailHandler = () => {
    const contactInfo = {
      contactId: OneContact.id,
      detailType: "alternate email",
      detailValue: alternateEmail,
    };
    dispatch(addAlternateContactAsync(contactInfo));
    setAlternateEmail("");
  };
  const emailValidation =
    alternateEmail.includes("@") && alternateEmail.includes(".");
  const phoneValidation = alternatePhone.length === 10;

  return (
    <>
      <Navbar
        loginPageStatus={true}
        loggedIn={true}
        onLogout={onLogoutHandler}
      />
      <div className={classes.outerDiv}>
        <div className={classes.imageDiv}>
          <img src={avatar} alt="avatar" className={classes.image} />
        </div>
        <div className={classes.contactInfoLeft}>
          <div className={classes.oneName}>
            <LuContactRound />
            <span className={classes.span}>{OneContact.name}</span>
          </div>
          <div className={classes.onePhone}>
            <div className={classes.phone}>
              <div className={classes.phoneDiv}>
                <FaPhoneAlt className={classes.phoneIcon} />
                <span className={classes.span}>{OneContact.phone}</span>
              </div>
              <AlternateDetails
                contactDetails={contactDetails}
                callType={"phone"}
              />
            </div>
            <hr />
            <input
              className={classes.alternateInput}
              type="text"
              maxLength={10}
              placeholder="Add Alternate number"
              value={alternatePhone}
              onChange={phoneHandler}
            />
            <button onClick={savePhoneHandler} disabled={!phoneValidation}>
              Save
            </button>
          </div>
          <div className={classes.oneEmail}>
            <div className={classes.email}>
              <CiMail className={classes.emailIcon} />
              <span className={classes.span}>{OneContact.email}</span>
            </div>
            <AlternateDetails
              contactDetails={contactDetails}
              callType={"email"}
            />
            <input
              className={classes.emailInput}
              type="text"
              placeholder="Add Alternate Email-id"
              value={alternateEmail}
              onChange={emailHandler}
            />
            <button onClick={saveEmailHandler} disabled={!emailValidation}>
              Save
            </button>
          </div>
          <div className={classes.oneGroup}>
            <GrGroup className={classes.cgroupIcon} />
            <span className={classes.span}>{OneContact.cgroup}</span>
          </div>
        </div>
        <div className={classes.contactInfoRight}>
          <div className={classes.oneAddress}>
            <AlternateAddress />
          </div>
          <ImportantDate contactId={OneContact.id} contactDetails={contactDetails}/>
        </div>
      </div>
    </>
  );
};

export default OneContact;
