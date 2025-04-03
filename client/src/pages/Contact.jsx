import { useEffect, useState } from "react";
import { useLoginContext } from "../hooks/useLoginContext";
import { contactAPI } from "../api";

export default function Contact() {
  const { userData } = useLoginContext();
  console.log("userData at Contact Page : ", userData);

  const [contact, setContact] = useState({
    username: "",
    email: "",
    query: "",
  });

  useEffect(() => {
    setContact({
      username: userData.username,
      email: userData.email,
      query: "",
    });
  }, [userData]);

  function handleInput(e) {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(contact);
    try {
      const response = await fetch(contactAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        alert("query sent, we will get back to you..");
      } else {
        console.log("something went wrong while creating your query");
      }
    } catch (error) {
      console.log("error from frontend {contact}", error);
    }
  }

  return (
    <div className="main-container">
      <div className="registration-form">
        <h1 className="form-h1">Contact us</h1>
        <form>
          <div className="form-content">
            <label htmlFor="username">Enter Username</label>
            <input
              value={contact.username}
              type="text"
              name="username"
              placeholder="username"
              id="username"
              required
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="email">Enter Email</label>
            <input
              value={contact.email}
              type="text"
              name="email"
              placeholder="email"
              id="email"
              required
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <label htmlFor="query">Leave a message</label>
            <textarea
              name="query"
              id="query"
              placeholder="type message"
              required
              autoComplete="off"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="form-content">
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>
        </form>
      </div>
      <div className="embedded-location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1753.1440755873787!2d77.40853998840842!3d28.50097705108587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce858fdc89639%3A0x35e14bd22bee2b6!2sAdvant%20Navis%20Business%20Park%2C%20Noida-Greater%20Noida%20Expy%2C%20Paras%20Tierea%2C%20Sector%20142%2C%20Noida%2C%20Uttar%20Pradesh%20201305!5e0!3m2!1sen!2sin!4v1743451699600!5m2!1sen!2sin"
          // width="500"
          // height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
