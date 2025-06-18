import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

interface NavbarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, isMobile, onClose }) => {
  const navItems = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'About', path: '/about' },
    { id: 3, label: 'Services', path: '/services' },
    { id: 4, label: 'Contact', path: '/contact' },
    { id: 5, label: 'Schedule', path: '/schedule' },
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div className="navbar-overlay" onClick={onClose} />
      )}
      <nav className={`navbar ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link to={item.path} className="nav-link" onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar; 