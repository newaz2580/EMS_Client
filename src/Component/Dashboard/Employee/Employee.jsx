import React from 'react';
import MenuItem from '../MenuItem';
import { BsFingerprint } from 'react-icons/bs'
const Employee = () => {
    return (
        <div>
            <MenuItem icon={BsFingerprint} label='Work Sheet' address='workSheet' />
            <MenuItem icon={BsFingerprint} label='Payment History' address='paymentHistory' />

           
        </div>
    );
};

export default Employee;