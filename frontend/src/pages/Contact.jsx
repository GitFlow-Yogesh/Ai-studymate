import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMsg(res.data.message);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (err) {
      setResponseMsg('❌ Something went wrong. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>

        {responseMsg && <p className="response-msg">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default Contact;
