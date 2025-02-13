import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addContactAsync } from "../../features/contact/contactSlice";
import { useDispatch } from "react-redux";
import classes from "./Import.module.css";
const Import = () => {
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const [isImportClicked, setIsImportClicked] = useState(false);

  const fileHandler = (event) => {
    const file = event.target.files[0]; // to get the first file selected by user
    setFileName(file.name);

    //to read file
    console.log("reading file....");
    const reader = new FileReader();
    //onLoad event handler is triggered when file has been successfully read
    reader.onload = (e) => {
      console.log("file read successfully");
      const binaryStr = e.target.result; //contains contents of file as a binary string
      const workbook = XLSX.read(binaryStr, { type: "binary" }); //reads the binary string and parses into workbook object
      const sheetName = workbook.SheetNames[0]; //first sheet of workbook
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      jsonData.map((contact) => {
        contact.user_id = JSON.parse(localStorage.getItem("user")).id;
        console.log(contact);
        dispatch(addContactAsync(contact));
      });
    };

    reader.readAsArrayBuffer(file);
  };
  const importClickHandler = () => {
    setIsImportClicked(true);
  };
  return (
    <div>
      {!isImportClicked && (
        <div>
          <button onClick={importClickHandler} className={classes.import}>
            Import Contacts
          </button>
        </div>
      )}
      {isImportClicked && <input type="file" onChange={fileHandler} />}
    </div>
  );
};

export default Import;
