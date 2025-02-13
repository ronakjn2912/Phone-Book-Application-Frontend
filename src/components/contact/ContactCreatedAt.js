import React from "react";
import classes from "./ContactCreatedAt.module.css";
const ContactCreatedAt = (props) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let time = new Date(props.time);
  return (
    <div className={classes.contactDateBlock}>
      <span>Created At:</span>


      <div className={classes.contactDate}>
        {time.getDate()}-{monthNames[time.getMonth() ]}-
        {time.getFullYear()}
      </div>
      
    </div>
  );
};

export default ContactCreatedAt;
