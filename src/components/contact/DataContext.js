import React, { createContext, useEffect, useState } from "react";

const DataContext = createContext(); //Creates context

//Data provider is context provider to children components, A wrapper which would wrap App component
const DataProvider = ({ children, initialContacts }) => {
  const user_array = JSON.parse(localStorage.getItem("user")); //convert entered user details into array

  const user_contacts = () => {//function which will return contacts of logged in user
    if (user_array.role !== "admin") {//if role is guest
      const userID_contacts = initialContacts.filter((contact) => {
        return contact.id === user_array.id;
      });
      return userID_contacts
    }

    else{//if role is admin - will get access to all contacts
        return initialContacts;
    }
  };

  const [formData, setFormData] = useState(user_contacts()); //State to hold contact data

  const addFormData = (newContact) => {
    setFormData((prevContacts) => [...prevContacts, newContact]); //function to add new contact
  };
  return (
    //formData is newContact
    //value utilized by useContext
    <DataContext.Provider value={{ formData, addFormData }}>
      {children} {/*provides context value to children components */}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
