import React from 'react';
import AllEmployeeList from './AllEmployeeList';
import Payroll from './Payroll';
import { BsFingerprint } from 'react-icons/bs';
import MenuItem from '../MenuItem';

const Admin = () => {
    return (
        <div>
            <MenuItem icon={BsFingerprint} label='All Employee List' address='allEmployeeList' />
            <MenuItem icon={BsFingerprint} label='Payroll' address='payroll' />
            
        </div>
    );
};

export default Admin;