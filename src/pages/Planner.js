import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FinancialPlan from './FinancialPlan';  // Correct import path

function PlannerPage() {
  const [numKids, setNumKids] = useState('');
  const [workingMom, setWorkingMom] = useState('');
  const [race, setRace] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [income, setIncome] = useState('');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f7f6' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffcccb', padding: '10px 20px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={buttonStyle}>Home</button>
          </Link>
          <button style={buttonStyle}>Features</button>
          <button style={buttonStyle}>About Us</button>
          <button style={buttonStyle}>Contact</button>
        </div>
      </header>

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to Plan Baby</h1>
        <p style={{ fontSize: '20px', color: '#333' }}>
          Calculate the cost of raising a child in Singapore based on your inputs.
        </p>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <label htmlFor="num-kids">Current number of children</label>
            <input
              type="number"
              id="num-kids"
              value={numKids}
              onChange={(e) => setNumKids(e.target.value)}
              placeholder="Enter the number of kids"
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="working-mom">Working Mom?</label>
            <select
              id="working-mom"
              value={workingMom}
              onChange={(e) => setWorkingMom(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="race">Race</label>
            <select
              id="race"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Chinese">Chinese</option>
              <option value="Malay">Malay</option>
              <option value="Indian">Indian</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="citizenship">Citizenship</label>
            <select
              id="citizenship"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="Singaporean">Singaporean</option>
              <option value="PR">Permanent Resident (PR)</option>
              <option value="Foreigner">Foreigner</option>
            </select>
          </div>

          <div>
            <label htmlFor="income">Household Income</label>
            <input
              type="text"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your income"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Financial Plan Section */}
        <FinancialPlan
          numKids={numKids}
          workingMom={workingMom}
          race={race}
          citizenship={citizenship}
          income={income}
        />
      </div>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f7f6', color: '#555' }}>
        <p>&copy; 2024 Plan Baby. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Button and input styles
const buttonStyle = {
  backgroundColor: '#ffffff',
  color: '#ff6f61',
  border: '1px solid #ff6f61',
  borderRadius: '5px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '20px'
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '200px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

export default PlannerPage;
