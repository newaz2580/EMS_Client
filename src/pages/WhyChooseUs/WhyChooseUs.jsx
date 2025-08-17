import React from "react";
import { CheckCircle } from "lucide-react";

const reasons = [
  {
    title: "Real-time Workflow Monitoring",
    desc: "Track and manage employee tasks and productivity as they happen, ensuring transparency and accountability.",
  },
  {
    title: "Automated Salary Management",
    desc: "Streamline monthly payroll processes with automated payment tracking and salary distribution.",
  },
  {
    title: "Role-Based Access Control",
    desc: "Ensure data security by allowing only Admin, HR, or Employees to access permitted areas and features.",
  },
  {
    title: "Verified Employee System",
    desc: "HR can verify employees digitally to avoid fraud and ensure secure work and payment environments.",
  },
  {
    title: "Performance History Tracking",
    desc: "View each employee’s work history, performance insights, and attendance over time in one place.",
  },
  {
    title: "Secure Data Handling",
    desc: "All employee data is stored and managed securely using modern encryption and backend validation.",
  },
  {
    title: "Easy HR Management Tools",
    desc: "From verification to payment approval — HRs get a complete toolkit to manage employee needs efficiently.",
  },
  {
    title: "Employee Self-Service Dashboard",
    desc: "Empowers employees to track their work, salary history, and update tasks independently and easily.",
  },
];


const WhyChooseUs = () => {
  return (
    <section className="py-5 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4 poppins-regular">Why Choose Us?</h2>
          <p className="text-gray-700 dark:text-white text-lg max-w-2xl mx-auto inter">
            We make employee management smarter, faster, and more secure. Here’s what sets us apart:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-black dark:text-white poppins-regular">{reason.title}</h4>
                <p className="text-gray-700 dark:text-white inter">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
