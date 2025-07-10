import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import UserRole from '../../hooks/userRole';
const WorkSheet = () => {
    const [role]=UserRole()
    console.log(role)
    return (
        <div>
            <h2>WorkSheetss</h2>
  <table>
  <tr>
    <th>
        <select>
            <option value="" >Tasks </option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>

        </select>
    </th>
    <th>
        
        <input type="number" placeholder='enter your hourly work' />
    </th>
    <th>
        <DatePicker/> 
    </th>
    <th><button className='btn'>Add</button></th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  
</table>
        </div>
    );
};

export default WorkSheet;