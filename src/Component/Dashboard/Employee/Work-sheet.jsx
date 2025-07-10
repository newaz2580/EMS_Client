import React from 'react';

const WorkSheet = () => {
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
    <th>Country</th>
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