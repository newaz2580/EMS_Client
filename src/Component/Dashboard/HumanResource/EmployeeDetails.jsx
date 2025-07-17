import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';

// Capitalize month for proper Date parsing
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const EmployeeDetails = () => {
  const { email } = useParams(); // email from route param
  const axiosSecure = useAxiosSecure(); // secured axios instance
  const [employee, setEmployee] = useState(null);
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect if dark mode is active by checking <html> class
    const darkModeActive = document.documentElement.classList.contains('dark');
    setIsDark(darkModeActive);

    // Optional: Listen for dark mode class changes (if you toggle dynamically)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        // 1. Get employee info
        const userRes = await axiosSecure.get(`/users?email=${email}`);
        setEmployee(userRes.data[0]);

        // 2. Get payment/salary data
        const payRes = await axiosSecure.get(`/payment-history?email=${email}`);
        const sorted = payRes.data.data?.sort((a, b) => {
          const aDate = new Date(`${a.year}-${capitalize(a.month)}-01`);
          const bDate = new Date(`${b.year}-${capitalize(b.month)}-01`);
          return aDate - bDate;
        });

        // 3. Format data for Recharts
        const formatted = sorted?.map((item) => ({
          monthYear: `${capitalize(item.month)} ${item.year}`,
          salary: parseInt(item.salary),
        }));

        setSalaryData(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [email, axiosSecure]);

  if (loading)
    return <p className="text-center py-10 text-lg">Loading...</p>;

  if (!employee)
    return (
      <p className="text-center py-10 text-red-500">Employee not found!</p>
    );

  const textColor = isDark ? '#f9fafb' : '#1f2937'; // white-ish or dark gray
  const gridColor = isDark ? '#374151' : '#ccc'; // dark gray grid or light gray

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        Employee Details
      </h2>

      {/* Employee Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <img
          src={employee.imageURL}
          alt={employee.name}
          className="w-28 h-28 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold text-black dark:text-white">
            {employee.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {employee.designation}
          </p>
          <p className="text-gray-500 dark:text-gray-400">{employee.email}</p>
        </div>
      </div>

      {/* Salary Bar Chart */}
      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Salary History
      </h3>

      {salaryData?.length > 0 ? (
        <div
          style={{ width: '100%', height: 400 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="monthYear"
                tick={{ fill: textColor }}
                label={{
                  value: 'Month & Year',
                  position: 'insideBottom',
                  offset: -5,
                  fill: textColor,
                }}
              />
              <YAxis
                tick={{ fill: textColor }}
                label={{
                  value: 'Salary (৳)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: textColor,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  color: isDark ? '#f9fafb' : '#000',
                }}
              />
              <Bar dataKey="salary" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No salary payment records found.
        </p>
      )}
    </div>
  );
};

export default EmployeeDetails;
