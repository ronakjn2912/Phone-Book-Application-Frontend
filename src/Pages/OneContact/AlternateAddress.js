import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import classes from "./AlternateAddress.module.css";
import { VscChromeMinimize } from "react-icons/vsc";
const AlternateAddress = () => {
  const [addressInputClicked, setAddressInputClicked] = useState("");

  const addressClickHandler = () => {
    setAddressInputClicked(true);
  };

  const minimizeClickHandler = () => {
    //to minimize the address section
    setAddressInputClicked(false);
  };
  return (
    <div className={classes.address}>
      <div className={classes.addressHeader}>
        <FaLocationDot />
        {!addressInputClicked && (
          <input
            className={classes.addressInput}
            type="text"
            placeholder="Add Address"
            onClick={addressClickHandler}
          />
        )}
        <button
          className={classes.minimize}
          style={{ display: addressInputClicked ? "block" : "none" }}
          onClick={minimizeClickHandler}
        >
          <VscChromeMinimize />
        </button>
      </div>
      {addressInputClicked && (
        <div className={classes.addressInfo}>
          <input
            className={classes.addressDetails}
            type="text"
            placeholder="Street"
          />
          <input
            className={classes.addressDetails}
            type="text"
            placeholder="City"
          />
          <input
            className={classes.addressDetails}
            type="text"
            placeholder="State"
          />
          <input
            className={classes.addressDetails}
            type="text"
            placeholder="Pincode"
          />
          <input
            className={classes.addressDetails}
            type="text"
            placeholder="Country"
          />
        </div>
      )}
    </div>
  );
};

export default AlternateAddress;
