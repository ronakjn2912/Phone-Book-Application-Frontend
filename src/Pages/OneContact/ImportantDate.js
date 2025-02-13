import React, { useEffect, useState } from "react";
import classes from "./ImportantDate.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import {
  addEventDateAsync,
  fetchEventAsync,
  ImportantDateAsync,
} from "../../features/contact/contactOneSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEditCalendar } from "react-icons/md";

const ImportantDate = (props) => {
  const dispatch = useDispatch();
  const [dateInputClicked, setDateInputClicked] = useState(false);
  const [dateOption, setDateOption] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [customClicked, setCustomClicked] = useState(false);

  useEffect(() => {
    console.log("fetching event");
    dispatch(fetchEventAsync());
  }, []);
  const eventDetails = useSelector(
    (state) => state.contactInfo.userEventDetails
  );

  const ImportantDatesHandler = () => {
    setDateInputClicked(true);
  };
  const selectedOptionHandler = (event) => {
    if (event.target.value === "Custom") {
      setCustomClicked(true);
      setDateOption("");
    } else {
      setDateOption(event.target.value);
    }
  };
  const dateHandler = (event) => {
    setDateValue(event.target.value);
  };
  const saveDateHandler = () => {
    //make different table for important dates
    const eventInfo = {
      user_id: props.contactId,
      eventName: dateOption,
      date: dateValue,
    };
    dispatch(addEventDateAsync(eventInfo));
    setDateInputClicked(false);
    setDateOption("");
    setDateValue("");
    setCustomClicked(false);
  };
  return (
    <div className={classes.oneDate}>
      <FaCalendarAlt />
      <li type="none">
        {eventDetails.map((event) => {
          if (event.user_id === props.contactId) {
            return (
              <div key={event.id} className={classes.existingDates}>
                <div>{event.eventName}</div>
                <span>-</span>
                <div>{event.date}</div>
              </div>
            );
          }
        })}
        {!dateInputClicked && (
          <div className={classes.indexName} onClick={ImportantDatesHandler}>
            <MdOutlineEditCalendar className={classes.calendarIcon}/>
            <span>Important Dates</span>
          </div>
        )}
        {dateInputClicked && (
          <div className={classes.indexDate}>
            <div className={classes.selectDate}>
              {!customClicked && (
                <select
                  className={classes.dateOptions}
                  onChange={selectedOptionHandler}
                  value={dateOption}
                >
                  <option value="">Select Event</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Custom</option>
                </select>
              )}

              {customClicked && (
                <input
                  type="text"
                  placeholder="Custom Event"
                  className={classes.dateOptions}
                  value={dateOption}
                  onChange={selectedOptionHandler}
                ></input>
              )}
              <input
                type="date"
                className={classes.dateOptions}
                value={dateValue}
                onChange={dateHandler}
              ></input>
            </div>
            <button className={classes.saveDate} onClick={saveDateHandler}>
              Save
            </button>
          </div>
        )}
      </li>
    </div>
  );
};

export default ImportantDate;
