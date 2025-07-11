import React from 'react';
import { FaUsers, FaMoneyCheckAlt, FaRegFileAlt, FaCalendarCheck, FaComments, FaChartLine, FaClock, FaUserShield } from 'react-icons/fa';

const services = [
  {
    icon: <FaUsers className="text-4xl text-lime-600" />,
    title: 'Employee Management',
    desc: 'Manage employee profiles, roles, and teams efficiently.',
  },
  {
    icon: <FaMoneyCheckAlt className="text-4xl text-lime-600" />,
    title: 'Payroll System',
    desc: 'Automated salary calculation based on attendance.',
  },
  {
    icon: <FaRegFileAlt className="text-4xl text-lime-600" />,
    title: 'Contract Records',
    desc: 'Digitally store and manage employee contracts.',
  },
  {
    icon: <FaCalendarCheck className="text-4xl text-lime-600" />,
    title: 'Work Reports',
    desc: 'Employees can submit daily/weekly task updates.',
  },
  {
    icon: <FaComments className="text-4xl text-lime-600" />,
    title: 'Internal Chat',
    desc: 'Facilitate communication between employees and HR.',
  },
  {
    icon: <FaChartLine className="text-4xl text-lime-600" />,
    title: 'Performance Tracking',
    desc: 'Monitor and analyze employee productivity.',
  },
  {
    icon: <FaClock className="text-4xl text-lime-600" />,
    title: 'Attendance Logs',
    desc: 'Track working hours and leave status.',
  },
  {
    icon: <FaUserShield className="text-4xl text-lime-600" />,
    title: 'Role-Based Access',
    desc: 'Secure dashboard access based on user roles.',
  },
];

const ServicesSection = () => {
  return (
    <div className="max-w-11/12 mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2 text-black">{service.title}</h3>
            <p className="text-gray-600 text-sm text-center">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
