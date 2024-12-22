import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', margin: 0, padding: 0 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffcccb', padding: '10px 20px', color: '#ffffff' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={navButtonStyle}>Home</button>
          <button style={navButtonStyle}>Features</button>
          <button style={navButtonStyle}>About Us</button>
          <button style={navButtonStyle}>Contact</button>
        </div>
      </header>

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to Plan Baby</h1>
        <p style={introStyle}>
          Your Financial Planner for Raising a Child in Singapore
        </p>
        <p style={introStyle}>
          Our application provides you with a comprehensive and easy-to-use tool to help plan and budget the costs of raising a child in Singapore. From childcare expenses to education planning, we've got you covered with foresight into your financial journey.
        </p>
      </div>

      {/* Link to Planner page */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/planner" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>Go to Planner</button>
        </Link>
      </div>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f7f6', color: '#555' }}>
        &copy; 2024 Plan Baby. All rights reserved.
      </footer>
    </div>
  );
};

// Inline styles
const navButtonStyle = {
  backgroundColor: '#ffffff',
  color: '#ff6f61',
  border: '1px solid #ffffff',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const introStyle = {
  fontSize: '20px',
  color: '#333',
};

const bodyParagraphStyle = {
  marginTop: '30px',
  textAlign: 'left',
  padding: '0 20px',
  fontSize: '18px',
  color: '#333',
};

const buttonStyle = {
  backgroundColor: '#8fd8d2',
  color: '#fff',
  padding: '15px 30px',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

export default Home;
