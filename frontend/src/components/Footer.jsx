import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePagination } from '../context/PaginationContext';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const { setCurrentPage } = usePagination();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return setMessage('❌ Please enter a valid email.');

    try {
      const res = await axios.post('http://localhost:5000/api/subscribe', { email });
      setMessage('✅ Subscribed successfully!');
      setEmail('');
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage('⚠️ You are already subscribed.');
      } else {
        setMessage('❌ Subscription failed. Try again.');
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: About */}
        <div className="footer-column">
          <h4>About AI StudyMate</h4>
          <p>
            AI StudyMate helps students explore powerful AI tools curated for education,
            productivity, and creativity — all in one place.
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link" onClick={() => setCurrentPage(1)}>
                Home
              </Link>
            </li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/login" className="footer-link">Login</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
          </ul>
        </div>

        {/* Right: Newsletter */}
        <div className="footer-column">
          <h4>Stay Updated</h4>
          <p>Join our mailing list to receive updates on the latest tools!</p>
          <form className="footer-subscribe" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
          {message && <p className="subscribe-message">{message}</p>}
        </div>
      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} AI StudyMate. Built for students, by students.
      </p>
    </footer>
  );
};

export default Footer;
