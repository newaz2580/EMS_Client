import React from "react";
import MenuItem from "../MenuItem";
import { FaUsersCog, FaMoneyCheckAlt } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
const Admin = () => {
  return (
    <div>
      <MenuItem
        icon={FaUsersCog}
        label="All Employee List"
        address="allEmployeeList"
      />
      <MenuItem icon={FaMoneyCheckAlt} label="Payroll" address="payroll" />
      <MenuItem icon={MdFeedback} label="FeedBack" address="feedback" />
    </div>
  );
};

export default Admin;
