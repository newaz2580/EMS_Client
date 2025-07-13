import React from "react";
import MenuItem from "../MenuItem";

import { FaUsers, FaUserTie, FaChartLine } from "react-icons/fa";

const HumanResource = () => {
  return (
    <div>
      <MenuItem icon={FaUsers} label="Employee List" address="employeeList" />
      <MenuItem
        icon={FaUserTie}
        label="Employee Details"
        address="employeeDetails"
      />
      <MenuItem icon={FaChartLine} label="Progress" address="progress" />
    </div>
  );
};

export default HumanResource;
