import React from "react";
import classes from "./ContactItems.module.css";
import ContactCreatedAt from "./ContactCreatedAt";
import { useDispatch } from "react-redux";
import {
  addFavoriteContactAsync,
  deleteContactAsync,
  fetchContactAsync,
} from "./../../features/contact/contactSlice";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Alert from "./../Helpers/alert/Alert";
import { useState } from "react";
import CgroupTag from "./CgroupTag";
import { FaStar } from "react-icons/fa";

const ContactItems = (props) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(""); //for alert type(delete or edit)
  const [favorite, setFavorite] = useState(false);

  const editHandler = (event) => {
    event.stopPropagation(); //to prevent event bubbling
    props.onEdit(props.items.phone);
  };

  const deleteHandler = (event) => {
    event.stopPropagation(); //to prevent event bubbling
    setShowAlert(true);
    setAlertType("delete");
  };

  const confirmDeleteHandler = (event) => {
    event.stopPropagation();
    setShowAlert(false);
    dispatch(deleteContactAsync(props.items));
  };

  const cancelDeleteHandler = (event) => {
    event.stopPropagation();
    setShowAlert(false);
  };

  const favoriteHandler = (event) => {
    event.stopPropagation();
    setFavorite(!favorite);
    dispatch(addFavoriteContactAsync(props.items.id));
  };
  return (
    <div className={classes.contactItems}>
      <div className={classes.NameFunctionalities}>
        <div className={classes.fullname}>{props.items.name}</div>

        <div className={classes.functionalities}>
          <div className={classes.cgroupTag}>
            <CgroupTag contactGroup={props.items.cgroup} />
          </div>
          <button className={classes.edit} onClick={editHandler}>
            <FaUserEdit className={classes.editIcon} />
          </button>
          <button className={classes.delete} onClick={deleteHandler}>
            <MdDelete className={classes.deleteIcon} />
          </button>
        </div>
      </div>
      <ContactCreatedAt time={props.items.date} />
      <div className={classes.data}>
        <div className={classes.phone}>Phone: {props.items.phone}</div>
        <div className={classes.mail}>Email: {props.items.email}</div>
      </div>

      <div className={classes.favorite}>
        <FaStar
          onClick={favoriteHandler}
          style={{ color: props.items.favorite ? "#FFD700" : "#718096" }}
        />
      </div>

      {showAlert && (
        <Alert
          alert={`Sure you want to ${alertType} contact?`}
          onConfirm={confirmDeleteHandler}
          onCancel={cancelDeleteHandler}
        />
      )}
    </div>
  );
};

export default ContactItems;
