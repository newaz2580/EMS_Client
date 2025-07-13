import React from 'react';
import MenuItem from '../MenuItem';
import { MdOutlineAssignment } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa';
const Employee = () => {
    return (
        <div>
            <MenuItem icon={MdOutlineAssignment} label='Work Sheet' address='workSheet' />
            <MenuItem icon={FaCreditCard} label='Payment History' address='paymentHistory' />

           
        </div>
    );
};

export default Employee;