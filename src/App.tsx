import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/layout/Layout';
import Schedule from './pages/schedule/schedule';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
