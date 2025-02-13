import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import classes from "./AlternateDetails.module.css";

const AlternateDetails = (props) => {
  return (
    <>
      {props.contactDetails.map((contact) => {
        return (
          <>
            {contact.detailType === "alternate phone" &&
              props.callType === "phone" && (
                <>
                  <hr />
                  <div className={classes.alternateDiv} key={contact.id}>
                    <FaPhoneAlt className={classes.phoneIcon} />
                    <span className={classes.span}>{contact.detailValue}</span>
                  </div>
                </>
              )}

            {contact.detailType === "alternate email" &&
              props.callType === "email" && (
                <>
                  <hr />
                  <div className={classes.alternateDiv} key={contact.id}>
                    <CiMail className={classes.emailIcon} />
                    <span className={classes.span}>{contact.detailValue}</span>
                  </div>
                </>
              )}
          </>
        );
      })}
    </>
  );
};

export default AlternateDetails;
