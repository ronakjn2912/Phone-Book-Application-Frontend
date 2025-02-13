import { useState } from "react";
import classes from "./AddContact.module.css";
import { IoPersonAdd } from "react-icons/io5";
const AddContact = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchField, setSearchField] = useState("");

  const searchChangeHandler = (event) => {
    const newSearchField = event.target.value;
    setSearchField(newSearchField);
    props.onSearch(newSearchField);
  };

  const cgroupFilterHandler = (event) => {
    props.onCgroupFilter(event.target.value);
  };

  const addClickHandler = () => {
    setIsEditing(true);
  };

  return (
    <div className={classes.addContact}>
      {!isEditing && (
        <div className={classes.addContainer}>
          <button className={classes.add} onClick={addClickHandler}>
            <IoPersonAdd className={classes.addIcon} />
            <div className={classes.tooltip}>Add Contact</div>
          </button>
        </div>
      )}

      {isEditing && props.onClicked()}

      <div className={classes.searchDiv}>
        <input
          className={classes.search}
          type="search"
          placeholder="Search"
          name="searchField"
          value={searchField}
          onChange={searchChangeHandler}
        ></input>
      </div>

      <div className={classes.cgroupFilter}>
        <select
          className={classes.cgroupFilterSelect}
          onChange={cgroupFilterHandler}
        >
          <option value="" selected>
            Contact Group
          </option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="Colleague">Colleague</option>
          <option value="Others">Others</option>
        </select>
      </div>
    </div>
  );
};

export default AddContact;
