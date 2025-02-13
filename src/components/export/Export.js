import React from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import classes from "./Export.module.css";
const Export = () => {
  const contacts = useSelector((state) => state.contact.numberOfContacts);
  const handleExport = () => {
    // Prepare the data for export
    const data = contacts.map((contact) => ({
      ID: contact.id,
      Name: contact.name,
      "Created Date": contact.date,
      Email: contact.email,
      "Mobile Number": contact.phone,
      "Contact Group": contact.cgroup,
      Favorite: contact.favorite ? "Yes" : "No",
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data); // one sheet in whole workbook

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new(); // workbook is collection of sheets
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts"); //appending a sheet to workbook

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  return (
    <div className={classes.exportDiv}>
      <button onClick={handleExport} className={classes.export}>
        Export Contacts
      </button>
    </div>
  );
};

export default Export;
