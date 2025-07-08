import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { usePagination } from '../context/PaginationContext';

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentPage } = usePagination();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleHomeClick = () => {
    setCurrentPage(1);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('user-logged-out')); // 🔔 Notify others
    navigate('/');
  };
  

  return (
    <nav className="navbar">
      <div className="logo">
  <Link to="/">AI StudyMate</Link>
</div>


      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleHomeClick}>Home</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>

        {user ? (
          <>
            <span >{user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'rotate-top' : ''}`}></div>
        <div className={`bar ${isOpen ? 'fade-out' : ''}`}></div>
        <div className={`bar ${isOpen ? 'rotate-bottom' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
