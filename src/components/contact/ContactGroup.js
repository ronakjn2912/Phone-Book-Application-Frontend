import { useState } from "react";
import classes from "./ContactGroup.module.css";
import { useSelector } from "react-redux";

const ContactGroup = (props) => {
  // const { formData } = useContext(DataContext);
  const formData = useSelector((state) => state.contact.numberOfContacts);
  const [cgroupCount, setCgroupCount] = useState(0);

  const optionHandler = (event) => {
    const cgroup = event.target.value;
    console.log(cgroup);
    setCgroupCount(
      formData.filter((contact) => {
        return contact.cgroup === cgroup;
      }).length
    );
  };

  return (
    <div className={classes.cgroupCount}>
      <label className={classes.cgroup}>cgroup: </label>
      <select
        className={classes.cgroupLabel}
        name="cgroup"
        onChange={optionHandler}
      >
        <option value="" selected>
          Select Contact Group
        </option>
        {/* to retrieve unique contact groups, set is used and spread operator is used to get them into array */}
        {[...new Set(formData.map((contact) => contact.cgroup))].map(
          (cgroup) => {
            //listing each contact group
            return (
              //key helps react to keep track of elements and their position in array, if key prop not given then react will have to re-render entire list which would cause performance issues
              <>
                <option
                  key={cgroup} //unique identity to prop
                  value={cgroup}
                >
                  {cgroup}
                </option>
              </>
            );
          }
        )}
      </select>

      <label className={classes.count}>{cgroupCount}</label>
    </div>
  );
};

export default ContactGroup;
