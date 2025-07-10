import React from 'react';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import Progress from './Progress';
import MenuItem from '../MenuItem';
import { BsFingerprint } from 'react-icons/bs';

const HumanResource = () => {
    return (
        <div>
             
             <MenuItem icon={BsFingerprint} label='Employee List' address='employeeList' />
             <MenuItem icon={BsFingerprint} label='Employee Details' address='employeeDetails' />
             <MenuItem icon={BsFingerprint} label='Progress' address='progress' />

          
        </div>
    );
};

export default HumanResource;