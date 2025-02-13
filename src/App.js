import React, { useState, useEffect } from "react";
import "./App.css";
import AddContact from "./components/contact/AddContact";
import ContactList from "./components/contact/ContactList";

import { Navigate } from "react-router-dom";  
import Navbar from "./components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactAsync } from "./features/contact/contactSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactAsync());
  }, [dispatch]);

  const formData = useSelector((state) => state.contact.numberOfContacts);
  const [search, setSearchName] = useState("");
  const [filterCgroup, setFilterCgroup] = useState("");
  const [isClicked, setClicked] = useState(false);

  // const user = JSON.parse(localStorage.getItem("user")); //logged in user details
   
  // const userContacts =
  //   user.role === "admin"
  //     ? formData
  //     : formData.filter((contact) => contact.user_id === user.id); //contacts of logged in user

  const onClickedHandler = () => {
    setClicked(true);
  };

  const onSearchHandler = (searched_name) => {
    setSearchName(searched_name);
  };

  const onCgroupFilterHandler = (cgroupOption) => {
    setFilterCgroup(cgroupOption);
  };

  const onLogoutHandler = () => {
    sessionStorage.removeItem("user-token");
  };

  return (
    <React.Fragment>
      <Navbar
        loginPageStatus={true}
        loggedIn={true}
        onLogout={onLogoutHandler}
      />
      <div>
        {!isClicked && (
          <>
            <AddContact
              onClicked={onClickedHandler}
              onSearch={onSearchHandler}
              onCgroupFilter={onCgroupFilterHandler}
            />
            <ContactList
              contacts={formData}
              searchQuery={search}
              cgroupOption={filterCgroup}
            />
          </>
        )}

        {isClicked && <Navigate to="/ContactForm" replace="true" />}
        {/* router in place of this so that navbar,search,add-contact remains consistent */}
      </div>
    </React.Fragment>
  );
}

export default App;
