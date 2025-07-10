import React from "react";

const teamMembers = [
  {
    name: "Md. Asif Rahman",
    title: "Software Engineer",
    image: "https://i.ibb.co/9N6zVnp/avatar1.png",
    bio: "Experienced MERN stack developer from Dhaka.",
  },
  {
    name: "Sharmin Akter",
    title: "HR Executive",
    image: "https://i.ibb.co/W2sMnsL/avatar2.png",
    bio: "Dedicated to employee well-being and company culture.",
  },
  {
    name: "Tanvir Hasan",
    title: "UI/UX Designer",
    image: "https://i.ibb.co/cvpyb04/avatar3.png",
    bio: "Designs intuitive user interfaces for smooth experiences.",
  },
  {
    name: "Rafiul Islam",
    title: "Project Manager",
    image: "https://i.ibb.co/F7Jg6q1/avatar4.png",
    bio: "Leads teams to deliver projects on time and efficiently.",
  },
  {
    name: "Nusrat Jahan",
    title: "Marketing Specialist",
    image: "https://i.ibb.co/2gV0N0s/avatar5.png",
    bio: "Helps the company grow through digital strategies.",
  },
  {
    name: "Sakib Chowdhury",
    title: "Support Engineer",
    image: "https://i.ibb.co/JxBLbSp/avatar6.png",
    bio: "Ensures clients get the best technical assistance.",
  },
  {
    name: "Farzana Yeasmin",
    title: "Accountant",
    image: "https://i.ibb.co/ZVtqFqJ/avatar7.png",
    bio: "Manages salary disbursement and financial records.",
  },
  {
    name: "Kawsar Ahmed",
    title: "DevOps Engineer",
    image: "https://i.ibb.co/tqkRMkZ/avatar8.png",
    bio: "Maintains infrastructure and deployment pipelines.",
  },
];


const OurTeam = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Meet Our Professionals</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our dedicated team members work day and night to ensure the best employee experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-indigo-200"
              />
              <h3 className="text-xl font-bold text-gray-800 text-center">{member.name}</h3>
              <p className="text-indigo-600 text-center font-medium">{member.title}</p>
              <p className="text-gray-600 text-sm mt-2 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
