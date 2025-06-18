import React from 'react';
import './header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        <span className="menu-icon"></span>
      </button>
      <h1 className="header-title">My App</h1>
    </header>
  );
};

export default Header; 