import React from "react";
import { MdFamilyRestroom } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FcBusinessman } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";

const CgroupTag = ({ contactGroup }) => {
  return (
    <>
      {(contactGroup === "Family" && <MdFamilyRestroom />) ||
        (contactGroup === "Friend" && <LiaUserFriendsSolid />) ||
        (contactGroup === "Colleague" && <FcBusinessman />) ||
        (contactGroup === "Others" && <MdOutlinePending />)}
    </>
  );
};

export default CgroupTag;
