import React from "react";
import { toast } from "react-toastify";
import { FaUsers, FaRegHandshake, FaAward } from "react-icons/fa";

const JoinOurTeam = () => {
  const handleJoin = () => {
    toast.success(" Successful applied");
  };

  const benefits = [
    { icon: <FaUsers className="w-8 h-8 text-blue-400" />, text: "Collaborative Environment" },
    { icon: <FaRegHandshake className="w-8 h-8 text-green-400" />, text: "Supportive Team" },
    { icon: <FaAward className="w-8 h-8 text-blue-400" />, text: "Career Growth & Recognition" },
  ];

  return (
    <section className="relative py-5 px-4  bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="absolute inset-0 "></div>

      <div className="relative max-w-11/12 mx-auto text-center ">
        <h2 className="text-4xl  font-bold mb-4 poppins-regular">Join Our EMS Team</h2>
        <p className="text-lg  mb-8 text-gray-700 dark:text-gray-200 inter">
          Be a part of our growing Employee Management System family. Collaborate, grow, and make a real impact.
        </p>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {benefit.icon}
              <p className="mt-4 font-semibold text-lg">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleJoin}
          className="px-10 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:-translate-y-1"
        >
          Apply Now
        </button>
      </div>
    </section>
  );
};

export default JoinOurTeam;
