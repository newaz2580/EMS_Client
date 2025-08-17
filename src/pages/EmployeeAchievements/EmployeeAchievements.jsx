import React from "react";
import { FaAward, FaUsers, FaClock } from "react-icons/fa";

const EmployeeAchievements = () => {
  
  const achievements = [
    {
      icon: <FaAward className="text-yellow-400 w-12 h-12 mx-auto mb-4" />,
      title: "Top Performers",
      value: 12,
      description: "Employees recognized for outstanding performance this year",
    },
    {
      icon: <FaUsers className="text-green-400 w-12 h-12 mx-auto mb-4" />,
      title: "Active Employees",
      value: 150,
      description: "Currently active employees in all departments",
    },
    {
      icon: <FaClock className="text-blue-400 w-12 h-12 mx-auto mb-4" />,
      title: "Perfect Attendance",
      value: 30,
      description: "Employees who maintained perfect attendance",
    },
  ];

  return (
    <section className="py-5 my-5 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white poppins-regular">
          Employee Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-2"
            >
              {item.icon}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {item.value} {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeAchievements;
