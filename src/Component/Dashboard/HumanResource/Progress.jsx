import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Get all users for dropdown
  const { data: users = [] } = useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  // Get all work records
  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["workSheet"],
    queryFn: async () => {
      const res = await axiosSecure.get("/workSheet");
      return res.data;
    },
  });

  // Filter logic
  useEffect(() => {
    let filtered = [...workRecords];

    if (selectedMonth) {
      filtered = filtered.filter((item) => {
        const itemMonth = new Date(item.date).toLocaleString("default", {
          month: "long",
        });
        return itemMonth.toLowerCase() === selectedMonth.toLowerCase();
      });
    }

    if (selectedEmployee) {
      filtered = filtered.filter((item) => item.email === selectedEmployee);
    }

    setFilteredData(filtered);
  }, [selectedEmployee, selectedMonth, workRecords]);

  const totalHours = filteredData.reduce(
    (sum, record) => sum + parseFloat(record.hours || 0),
    0
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Work Records</h2>

      {/* 🟩 Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="select select-bordered"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {users.map((user) => (
            <option key={user._id} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* 🟩 Work Hours Summary */}
      <div className="mb-4 text-lg font-medium">
        Total Work Hours: <span className="text-blue-600">{totalHours}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record._id}>
                <td>{record.name}</td>
                <td>{record.tasks}</td>
                <td>{record.hours}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 py-4">No records found</p>
        )}
      </div>
    </div>
  );
};

export default Progress;
