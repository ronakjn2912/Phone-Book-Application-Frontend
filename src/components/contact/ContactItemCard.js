import classes from "./ContactItemCard.module.css";
import React from "react";

const ContactItemCard = (props) => {

  return (
    <button className={classes.contactItem} onClick={()=>props.onCardClick(props.contact)}>
      {props.children}
      {/* This will render whatever is passed between the opening and closing tags of Card */}
    </button>
  );
};

export default ContactItemCard;
