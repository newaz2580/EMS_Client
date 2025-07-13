import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState('table');

  const { data: users = [], refetch } = useQuery({
    queryKey: ['verified-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/verified');
      return res.data;
    },
  });

  const handleMakeHR = async (id) => {
    await axiosSecure.patch(`/users/${id}`, { role: 'hr' });
    refetch();
  };

  const handleFire = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be fired and unable to login!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, fire!',
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/users/${id}`, { status: 'fired' });
      Swal.fire('Fired!', 'User has been fired.', 'success');
      refetch();
    }
  };

  const handleSalaryUpdate = async (id, currentSalary) => {
    const { value: newSalary } = await Swal.fire({
      title: 'Increase Salary',
      input: 'number',
      inputLabel: `Current: ৳${currentSalary}`,
      inputPlaceholder: 'Enter new salary',
      inputAttributes: {
        min: currentSalary + 1,
      },
      showCancelButton: true,
    });

    if (newSalary && parseInt(newSalary) > currentSalary) {
      await axiosSecure.patch(`/users/${id}`, { salary: parseInt(newSalary) });
      Swal.fire('Updated!', 'Salary has been increased.', 'success');
      refetch();
    } else if (newSalary) {
      Swal.fire('Error', 'Salary must be increased!', 'error');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Verified Employees</h2>
        <button
          onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
          className="btn btn-sm btn-primary"
        >
          Toggle to {viewMode === 'table' ? 'Card View' : 'Table View'}
        </button>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Role</th>
                <th>Make HR</th>
                <th>Fire</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.designation}</td>
                  <td>৳{user.salary}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== 'hr' ? (
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => handleMakeHR(user._id)}
                      >
                        Make HR
                      </button>
                    ) : (
                      <span className="text-gray-500">Already HR</span>
                    )}
                  </td>
                  <td>
                    {user.status === 'fired' ? (
                      <span className="text-red-500 font-semibold">Fired</span>
                    ) : (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleFire(user._id)}
                      >
                        Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="card bg-base-100 shadow-xl border border-gray-200"
            >
              <div className="card-body">
                <h2 className="card-title">{user.name}</h2>
                <p>Designation: {user.designation}</p>
                <p>Salary: ৳{user.salary}</p>
                <p>Role: {user.role}</p>
                <div className="mt-2 flex gap-2">
                  {user.role !== 'hr' && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMakeHR(user._id)}
                    >
                      Make HR
                    </button>
                  )}
                  {user.status === 'fired' ? (
                    <span className="text-red-500 font-bold">Fired</span>
                  ) : (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleFire(user._id)}
                    >
                      Fire
                    </button>
                  )}
                </div>
                <button
                  className="btn btn-xs btn-outline mt-2"
                  onClick={() => handleSalaryUpdate(user._id, user.salary)}
                >
                  Adjust Salary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
