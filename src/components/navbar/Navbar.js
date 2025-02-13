import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Export from "../export/Export";
import Import from "../import/Import";
import { IoIosMenu } from "react-icons/io";
const Navbar = (props) => {
  const [menu, setMenu] = useState(false);
  const onMenuHandler = () => {
    setMenu(!menu);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.left}>Personal Contact Management System</div>

      {props.loggedIn && (
        <div className={classes.ImportExport}>
          <IoIosMenu className={classes.menuIcon} onClick={onMenuHandler} />
          {menu && (
            <ul className={classes.dropDownMenu}>
              <li>
                <Import />
              </li>
              <hr className={classes.ruler}/>
              <li>
                <Export />
              </li>
            </ul>
          )}
        </div>
      )}
      {/* right Content*/}
      {!props.loginPageStatus && (
        <div className={classes.login}>
          <Link to={"/login"} className={classes.right}>
            Login
          </Link>
          <span className={classes.separation}>|</span>
          <Link to={"/register"} className={classes.right}>
            Register
          </Link>
        </div>
      )}
      {props.loggedIn && (
        <div className={classes.logout}>
          <Link to={"/"} className={classes.right} onClick={props.onLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
