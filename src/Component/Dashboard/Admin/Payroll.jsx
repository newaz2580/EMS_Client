import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payroll = () => {
    const axiosSecure=useAxiosSecure()
    const {data}=useQuery({
        queryKey:['payment'],
        queryFn:async()=>{
            const res=await axiosSecure('/payment')
          return res.data
        }
    })
    console.log(data)
    return (
        <div>
            <h1>Payment Confirm</h1>
            <table className='w-full border'>
                <thead>
                    <tr>
                        <th>EmployeeName</th>
                        <th>Salary</th>
                        <th>Payment Month</th>
                        <th>Payment year</th>
                        <th>Payment Date</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(payment=><tr key={payment._id} className='border text-center' >
                            <td>Shahnewaz</td>
                            <td>{payment.salary}</td>
                            <td>{payment.month}</td>
                            <td>{payment.year}</td>
                            <td>13/7/2025</td>
                            <td>pay</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Payroll;