import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      // 🔔 Dispatch custom event to notify other components
      window.dispatchEvent(new Event('user-logged-in'));

      setMessage('✅ Login successful! Redirecting...');
      if (onLogin) onLogin(user);

      // Delay slightly to show message, then redirect
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed. Try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {message && <p style={{ marginTop: '1rem', color: '#555' }}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
