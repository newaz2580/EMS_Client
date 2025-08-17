import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/dashboard/stats"); // dashboard stats endpoint
        setStats(res.data || {});

        // Fetch feedback count
        const feedbackRes = await axiosSecure.get("/dashboard/feedback"); // correct endpoint
        setFeedbackCount(feedbackRes.data?.count || 0); // backend returns { count, feedbacks }
      } catch (error) {
        toast.error("Failed to fetch stats or feedback");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  if (loading) return <LoadingSpinner />;
  if (!stats || Object.keys(stats).length === 0)
    return <p className="text-center text-red-500">No stats available</p>;

  // Pie chart for roles
  const roleData = [
    { name: "Employee", value: stats.totalEmployees || 0 },
    { name: "HR", value: stats.totalHRs || 0 },
    { name: "Admin", value: stats.totalAdmins || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Aggregate salary per employee
  const salaryMap = {};
  (stats.salaries || []).forEach(emp => {
    const name = emp.EmployeeName || emp.employeeName || "Unknown";
    const salary = Number(emp.salary) || 0;
    if (salaryMap[name]) {
      salaryMap[name] += salary;
    } else {
      salaryMap[name] = salary;
    }
  });

  const salaryData = Object.entries(salaryMap).map(([name, salary]) => ({ name, salary }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Total Employees</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalEmployees || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Total HRs</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalHRs || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Total Admins</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalAdmins || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Verified Users</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.verifiedUsers || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Feedbacks</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{feedbackCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Roles Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Salaries (Aggregated)</h2>
          {salaryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salary" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No salary data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
