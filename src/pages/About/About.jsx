import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-white">
            About EMS
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold">EMS (Employee Management System)</span> 
            is a modern platform designed to help businesses and HR teams 
            manage employees more efficiently. From tracking work performance 
            and managing payroll to handling employee data and generating reports, 
            EMS provides an all-in-one solution.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to simplify complex HR and payroll tasks, so 
            companies can focus on growth while employees enjoy transparency 
            and timely support. With EMS, you can streamline recruitment, 
            monitor attendance, approve salaries, and keep records safe in a 
            secure cloud environment.
          </p>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>📌 Manage employee records & profiles</li>
            <li>📌 Salary & payroll management with Stripe</li>
            <li>📌 Role-based access (Admin, HR, Employee)</li>
            <li>📌 Work hours & performance tracking</li>
            <li>📌 Secure login & authentication</li>
          </ul>
        </div>

        {/* Right Side - Image/Illustration */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/q37ySq2s/dddd.jpg"
            alt="EMS Illustration"
            className="rounded-2xl shadow-lg w-full md:w-4/5"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
