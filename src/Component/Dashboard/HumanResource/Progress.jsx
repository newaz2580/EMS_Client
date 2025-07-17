import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch verified users for dropdown
  const { data: users = [] } = useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/verified");
      return res.data;
    },
  });

  // Fetch all work records
  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["workSheet"],
    queryFn: async () => {
      const res = await axiosSecure.get("/workSheet");
      return res.data;
    },
  });

  // Filter work records by selected employee and month
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

  // Calculate total work hours from filtered data
  const totalHours = filteredData.reduce(
    (sum, record) => sum + parseFloat(record.hours || 0),
    0
  );

  if (isLoading)
    return (
      <p className="text-center py-6 text-lg dark:text-white">Loading...</p>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Employee Work Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {/* Employee Filter */}
        <select
          className="select select-bordered w-60 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
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

        {/* Month Filter */}
        <select
          className="select select-bordered w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Total Work Hours */}
      <div className="mb-6 text-center">
        <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Total Work Hours:
        </span>{" "}
        <span className="text-green-600 dark:text-green-400 font-bold">
          {totalHours.toFixed(2)} hours
        </span>
      </div>

      {/* Work Records Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <th>Employee Name</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record) => {
                const emp = users.find((u) => u.email === record.email);
                return (
                  <tr
                    key={record._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <td>{emp ? emp.name : record.name || "Unknown"}</td>
                    <td>{record.tasks}</td>
                    <td>{record.hours}</td>
                    <td>
                      {new Date(record.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 italic text-gray-500 dark:text-gray-400"
                >
                  No records found for selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
