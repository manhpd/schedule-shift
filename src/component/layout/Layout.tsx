import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Navbar from '../navbar/navbar';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="layout">
      <Header onMenuClick={toggleNavbar} />
      <div className="layout-content">
        <Navbar isOpen={isNavbarOpen} isMobile={isMobile} onClose={() => setIsNavbarOpen(false)} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
