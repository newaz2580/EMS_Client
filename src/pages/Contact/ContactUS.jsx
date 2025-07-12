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
      console.log(data);
      if (data.insertedId) {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <h2>Contact us</h2>
      <h1>EMS Company </h1>
      <p>Paratuly,Bancharampur,Brahmanbaria</p>
      <form onSubmit={handleMessage}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send your Message"
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUS;
