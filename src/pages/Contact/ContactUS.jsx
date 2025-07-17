import React, { useState } from "react";
import useAxiosSecure from "../../Component/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContactUS = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleMessage = async (e) => {
    e.preventDefault();
    const feedBack = { email, message };
    try {
      const { data } = await axiosSecure.post("/user/message", feedBack);
      if (data.insertedId) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thanks for contacting us!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center gap-12 p-10 bg-gray-100 dark:bg-gray-900">
      {/* Contact Info */}
      <div className="text-center md:text-left space-y-4">
        <h2 className="text-3xl font-bold text-green-700 dark:text-white">Contact Us</h2>
        <h3 className="text-xl font-semibold text-black dark:text-white">EMS Company</h3>
        <p className="text-black dark:text-white">Dhaka,Bangladesh</p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleMessage}
        className="bg-white dark:bg-gray-800  shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
          className="w-full  p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send your Message"
          required
          rows="5"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUS;
