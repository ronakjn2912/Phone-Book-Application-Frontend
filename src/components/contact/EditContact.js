import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EditContact.module.css";
import { useDispatch } from "react-redux";
import { editContactAsync } from "../../features/contact/contactSlice";

const EditContact = (props) => {
  const navigate = useNavigate();
  const [editedContact, setEditedContact] = useState({
    editedName: "",
    editedEmail: "",
    editedDate: "",
    editedPhone: "",
    editedCgroup: "",
  });

  const dispatch = useDispatch();

  const contactToBeEdited = props.oldContact.find(
    (contact) => contact.phone === props.oldPhone
  );

  const editNameHandler = (event) => {
    setEditedContact((prevState) => {
      return {
        ...prevState,
        editedName: event.target.value,
      };
    });
  };

  const editEmailHandler = (event) => {
    setEditedContact((prevState) => {
      return {
        ...prevState,
        editedEmail: event.target.value,
      };
    });
  };
  const editPhoneHandler = (event) => {
    setEditedContact((prevState) => {
      return {
        ...prevState,
        editedPhone: event.target.value,
      };
    });
  };
  const editDateHandler = (event) => {
    setEditedContact((prevState) => {
      return {
        ...prevState,
        editedDate: event.target.value,
      };
    });
  };

  const editCgroupHandler = (event) => {
    setEditedContact((prevState) => {
      return {
        ...prevState,
        editedCgroup: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newEditedContact = {
      name:
        editedContact.editedName === ""
          ? contactToBeEdited.name
          : editedContact.editedName,
      phone:
        editedContact.editedPhone === ""
          ? contactToBeEdited.phone
          : editedContact.editedPhone,
      email:
        editedContact.editedEmail === ""
          ? contactToBeEdited.email
          : editedContact.editedEmail,
      date:
        editedContact.editedDate === ""
          ? new Date(contactToBeEdited.date)
          : new Date(editedContact.editedDate),
      cgroup:
        editedContact.editedCgroup === ""
          ? contactToBeEdited.cgroup
          : editedContact.editedCgroup,

      id: contactToBeEdited.id,
      user_id : contactToBeEdited.user_id
    };

    dispatch(editContactAsync(newEditedContact));
    props.onEditedContact();

    setEditedContact(() => {
      return {
        editedName: "",
        editedEmail: "",
        editedPhone: "",
        editedDate: "",
        editedCgroup: "",
      };
    });
  };

  const resetHandler = () => {
    setEditedContact(() => {
      return {
        editedName: "",
        editedEmail: "",
        editedPhone: "",
        editedDate: "",
        editedCgroup: "",
      };
    });
  };

  const cancelHandler = () => {
    setEditedContact(() => {
      return {
        editedName: "",
        editedEmail: "",
        editedPhone: "",
        editedDate: "",
        editedCgroup: "",
      };
    });
    props.onEditedContact();
  };

  const editPropagationHandler = (event) => {
    event.stopPropagation(); //to prevent event bubbling
  };
  const checkValidity = () => {
    if (editedContact.editedPhone.length !== 0) {
      if (editedContact.editedPhone.length !== 10) {
        return true;
      }
      return false;
    }
    return false;
  };
  return (
    <div className={classes.formdata}>
      <form
        onSubmit={submitHandler}
        onReset={resetHandler}
        onClick={editPropagationHandler}
      >
        <div className={classes.nameEmail}>
          <label className={classes.nameLabel}>
            Name
            <input
              className={classes.nameInput}
              type="text"
              name="name"
              value={editedContact.editedName}
              onChange={editNameHandler}
              placeholder={contactToBeEdited.name}
            ></input>
          </label>

          <label className={classes.emailLabel}>
            Email
            <input
              className={classes.mailInput}
              type="email"
              name="email"
              value={editedContact.editedEmail}
              onChange={editEmailHandler}
              placeholder={contactToBeEdited.email}
            ></input>
          </label>
        </div>

        <div className={classes.datePhone}>
          <label className={classes.dateLabel}>
            Date
            <input
              className={classes.dateInput}
              type="date"
              name="date"
              value={editedContact.date}
              onChange={editDateHandler}
            ></input>
          </label>

          <div className={classes.mobileHandler}>
            <label className={classes.phoneLabel}>
              Phone
              <input
                className={classes.phoneInput}
                type="number"
                name="phone"
                value={editedContact.phone}
                onChange={editPhoneHandler}
                placeholder={contactToBeEdited.phone}
              ></input>
            </label>
          </div>
          {editedContact.editedPhone.length > 10 && (
            <span className={classes.alert}>
              Mobile Number should be 10 digit
            </span>
          )}
        </div>

        <div className={classes.cgroupDiv}>
          <label>
            Contact Group
            <select
              className={classes.cgroupSelect}
              name="cgroup"
              onChange={editCgroupHandler}
            >
              <option value="" selected>
                {contactToBeEdited.cgroup}
              </option>
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Others">Others</option>
            </select>
          </label>
        </div>
        <div className={classes.formButtons}>
          <button className={classes.ContactFormButton} type="reset">
            Reset
          </button>

          <button className={classes.ContactFormButton} onClick={cancelHandler}>
            Cancel
          </button>

          <button
            className={classes.ContactFormButton}
            type="submit"
            disabled={checkValidity()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
