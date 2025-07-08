import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ToolDetails from './pages/ToolDetails';
import Login from './pages/Login';
import About from './pages/About';
import { PaginationProvider } from './context/PaginationContext';

const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const hideFooter = location.pathname === '/login' || location.pathname === '/contact' || location.pathname === '/about';

  return (
    <PaginationProvider>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tool/:id" element={<ToolDetails />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {!hideFooter && <Footer />}
    </PaginationProvider>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
