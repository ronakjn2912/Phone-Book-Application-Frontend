import ContactItemCard from "./ContactItemCard";
import classes from "./ContactList.module.css";
import ContactItems from "./ContactItems";
import { useState } from "react";
import EditContact from "./EditContact";
import { useNavigate } from "react-router-dom";


const ContactList = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [oldPhone, setOldPhone] = useState();
  const navigate = useNavigate();
  const cardClickHandler = (oneCardContact) => {
    return navigate("/Contact", {
      state: oneCardContact,
    });
  };

  const handleEditToggle = (phoneNumber) => {
    setOldPhone(phoneNumber);
    setIsEdit(true); // Toggle edit state
  };

  const filteredContacts = props.contacts.filter((contact) => {
    if(!contact.name){
      console.log("name not present")
    }
    const name = contact.name.toLowerCase();
    const phone = contact.phone;
    return (
      (contact.cgroup === props.cgroupOption || props.cgroupOption === "") && //<-- for cgroup filter
      (name.includes(props.searchQuery) || phone.includes(props.searchQuery)) // <-- for search filter
    );
  });
  return (
    <div className={classes.contacts}>
      {filteredContacts.length === 0 && <p>No Contacts</p>}

      {filteredContacts.length !== 0 && (
        <>
          {!isEdit &&
            filteredContacts.map((contact) => {
              return (
                <ContactItemCard
                  contact={contact}
                  onCardClick={cardClickHandler}
                >
                  <ContactItems items={contact} onEdit={handleEditToggle} />
                </ContactItemCard>
              );
            })}

          {isEdit && (
            <EditContact
              oldPhone={oldPhone}
              oldContact={filteredContacts} //whole contactList
              onEditedContact={() => {
                setIsEdit(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
