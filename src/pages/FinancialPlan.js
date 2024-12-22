import React, { useState } from 'react';

const FinancialPlan = ({ numKids, workingMom, race, citizenship, income }) => {
  const [financialPlan, setFinancialPlan] = useState({
    pregnancy: [],
    infant: [],
    toddler: []
  });
  const [policies, setPolicies] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingPolicy, setLoadingPolicy] = useState(false);

  const OPENAI_API_KEY = '';

  const perCapitaIncome = (income / (2 + Number(numKids))).toFixed(2);

  const fetchFinancialPlan = async () => {
    setLoadingPlan(true);
    setFinancialPlan({ pregnancy: [], infant: [], toddler: [] });

    const prompt = `
      I am planning for the financial needs of raising children in Singapore with the following details:
      - Number of Existing Kids: ${numKids}
      - Working Mom: ${workingMom}
      - Race: ${race}
      - Citizenship: ${citizenship}
      - Household Income: SGD ${income}
      - Per Capita Income (PCI): SGD ${perCapitaIncome}
      
      Generate a financial breakdown for the following:
      1. Pregnancy – Itemized costs for medical bills, maternity packages, baby preparation.
      2. Infant (0-1 year) – Monthly costs for diapers, milk, vaccinations, and infant care.
      3. Toddler (1-3 years) – Monthly costs for food, childcare, education, and healthcare.

      Format the response as:
      Pregnancy:
      - Item: Cost range
      Infant (0-1 year):
      - Item: Cost range
      Toddler (1-3 years):
      - Item: Cost range
    `;

    const requestBody = {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const message = data.choices[0]?.message?.content || '';

      const formattedPlan = parsePlan(message);
      setFinancialPlan(formattedPlan);
      fetchPolicies();
    } catch (error) {
      console.error('Error fetching financial plan:', error);
      alert("Failed to generate financial plan. Please try again.");
    } finally {
      setLoadingPlan(false);
    }
  };

  const fetchPolicies = async () => {
    setLoadingPolicy(true);
    setPolicies('');

    const prompt = `
      Based on the following details:
      - Number of Existing Kids: ${numKids}
      - Citizenship: ${citizenship}
      - Household Income: SGD ${income}
      - Per Capita Income (PCI): SGD ${perCapitaIncome}
      
      List all financial assistance schemes and subsidies for raising children in Singapore, such as:
      - Baby Bonus Scheme
      - Infant/Childcare Subsidies
      - MediSave Maternity Package
      - ComCare or Housing Grants
      
      For each scheme, include:
      - Scheme Name
      - Eligibility criteria (e.g., PCI thresholds or household income)
      - Benefits or payout amounts
    `;

    const requestBody = {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const message = data.choices[0]?.message?.content || '';

      setPolicies(message);
    } catch (error) {
      console.error('Error fetching policies:', error);
      alert("Failed to fetch policies.");
    } finally {
      setLoadingPolicy(false);
    }
  };

  const parsePlan = (message) => {
    const sections = message.split('\n\n');
    let plan = { pregnancy: [], infant: [], toddler: [] };

    sections.forEach((section) => {
      if (section.startsWith('Pregnancy:')) {
        plan.pregnancy = section.split('\n').slice(1);
      } else if (section.startsWith('Infant')) {
        plan.infant = section.split('\n').slice(1);
      } else if (section.startsWith('Toddler')) {
        plan.toddler = section.split('\n').slice(1);
      }
    });

    return plan;
  };

  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <button onClick={fetchFinancialPlan} style={buttonStyle} disabled={loadingPlan}>
        {loadingPlan ? 'Generating...' : 'Generate Plan'}
      </button>

      <div style={containerStyle}>
        <h2>Financial Plan</h2>

        {loadingPlan ? (
          <div style={loadingBox}>Loading financial plan...</div>
        ) : (
          Object.keys(financialPlan).map((phase, idx) => (
            <div style={tabStyle} key={idx}>
              <h3>{phase.charAt(0).toUpperCase() + phase.slice(1)}</h3>
              {phase === 'infant' && <p style={phaseDesc}>0 - 1 year</p>}
              {phase === 'toddler' && <p style={phaseDesc}>1 - 3 years</p>}
              {financialPlan[phase].length > 0 ? (
                financialPlan[phase].map((item, i) => (
                  <p key={i}>{item}</p>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          ))
        )}
        <h2>Policies Applied</h2>
        {loadingPolicy ? (
          <div style={loadingBox}>Loading policies...</div>
        ) : (
        <div style={policiesStyle}>
            <pre style={preStyle}>
                {policies || "No policies applicable"}
            </pre>
        </div>
        )}
      </div>
    </div>
  );
};

// Styles remain the same
const phaseDesc = {
  fontStyle: 'italic',
  color: '#666',
  marginTop: '-10px',
  marginBottom: '10px'
};



// Styled components
const buttonStyle = {
  backgroundColor: '#ff6f61',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  marginBottom: '30px'
};

const containerStyle = {
  textAlign: 'left',
  maxWidth: '800px',
  margin: '0 auto'
};

const tabStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  margin: '20px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const policiesStyle = {
    backgroundColor: '#fff5f5',
    color: '#333',
    padding: '20px',
    border: '1px solid #ff6f61',
    borderRadius: '8px',
    marginTop: '30px',
    lineHeight: '1.6',
    whiteSpace: 'normal',             // Allow text to wrap naturally in div
    overflowWrap: 'anywhere',         // Break long lines at any point
    wordBreak: 'break-word',          // Force word breaking
    display: 'block',                 // Ensures block-level wrapping
    width: '100%',                    // Ensure full box width
    boxSizing: 'border-box',          // Include padding and border in width
    maxWidth: '100%'                  // Prevents content from exceeding box width
};

const preStyle = {
    whiteSpace: 'pre-wrap',  // Forces line breaks in <pre> to wrap at box edge
    wordBreak: 'break-word'  // Ensures long words break properly
};

  
  

const loadingBox = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
  fontStyle: 'italic'
};

export default FinancialPlan;
