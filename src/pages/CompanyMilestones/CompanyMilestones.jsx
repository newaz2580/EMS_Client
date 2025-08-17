import React from "react";

const CompanyMilestones = () => {
  return (
    <section className="py-5 my-5 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white poppins-regular">Our Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-lg shadow">
            <h3 className="text-4xl font-bold text-blue-600">150+</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Employees</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-lg shadow">
            <h3 className="text-4xl font-bold text-green-500">25</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Departments</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-lg shadow">
            <h3 className="text-4xl font-bold text-purple-500">500+</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Projects Completed</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-lg shadow">
            <h3 className="text-4xl font-bold text-yellow-500">100+</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMilestones;
