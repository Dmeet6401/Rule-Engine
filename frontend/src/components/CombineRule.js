import React, { useEffect, useState } from 'react';
import { createRule, getRules } from '../services/ruleService';

const CombineRule = () => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch existing rules
  useEffect(() => {
    const fetchRules = async () => {
      const fetchedRules = await getRules();
      setRules(fetchedRules);
    };

    fetchRules();
  }, [message]);

  // Handle selecting a rule
  const handleRuleSelection = (index, ruleId) => {
    const newSelectedRules = [...selectedRules];
    newSelectedRules[index] = { ruleId, operator: 'AND' }; // Default operator is AND
    setSelectedRules(newSelectedRules);
  };

  // Handle operator selection
  const handleOperatorChange = (index, operator) => {
    const newSelectedRules = [...selectedRules];
    newSelectedRules[index].operator = operator;
    setSelectedRules(newSelectedRules);
  };

  // Add a new rule selection
  const addRuleSelection = () => {
    setSelectedRules([...selectedRules, { ruleId: '', operator: 'AND' }]);
  };

  // Remove a selected rule
  const removeRuleSelection = (index) => {
    const newSelectedRules = selectedRules.filter((_, i) => i !== index);
    setSelectedRules(newSelectedRules);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedRules.length < 2) {
      setMessage('Select at least two rules to combine.');
      return;
    }

    // Combine the rules with their respective operators
    const combinedRuleString = selectedRules.map(({ ruleId, operator }, index) => {
      const rule = rules.find(r => r._id === ruleId);
      const ruleString = rule ? rule.ruleString : '';
      return index === 0 ? ruleString : ` ${operator} ${ruleString}`;
    }).join(' ');


    try {
        const response = await createRule(combinedRuleString);
        setMessage(response.message);
      } catch (error) {
        setMessage('Error creating rule');
      }
  };

  const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    ruleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    },
    select: {
      padding: 10,
      borderRadius: 5,
      border: '1px solid #ccc',
      flexGrow: 1,
    },
    removeButton: {
      marginLeft: '10px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: 5,
      cursor: 'pointer',
    },
    addButton: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: 5,
      cursor: 'pointer',
      margin: '10px', // Space around button
    },
    submitButton: {
      backgroundColor: '#2196F3',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: 5,
      cursor: 'pointer',
      margin: '10px', // Space around button
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center', // Center the buttons
      marginTop: '20px',
    },
    message: {
      color: '#00ff00',
      marginTop: 20,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Combine Existing Rules</h2>

      {selectedRules.map((selectedRule, index) => (
        <div key={index} style={styles.ruleContainer}>
          <select
            onChange={(e) => handleRuleSelection(index, e.target.value)}
            value={selectedRule.ruleId}
            style={styles.select}
          >
            <option value="" disabled>Select a rule</option>
            {rules.map((rule,index) => (
              <option key={rule._id} value={rule._id}>
                {index + 1}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleOperatorChange(index, e.target.value)}
            value={selectedRule.operator}
            style={{ ...styles.select, marginLeft: '10px' }}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
            <option value="">NONE</option>
          </select>
          <button onClick={() => removeRuleSelection(index)} style={styles.removeButton}>
            Remove
          </button>
        </div>
      ))}

      {/* Centered Buttons */}
      <div style={styles.buttonContainer}>
        <button onClick={addRuleSelection} style={styles.addButton}>
          Add Rule
        </button>

        <button onClick={handleSubmit} style={styles.submitButton}>
          Combine Rules
        </button>
      </div>

      {message && (
        <p 
          style={{ 
            ...styles.message, 
            color: message === 'Select at least two rules to combine.' ? 'red' : 'green' 
          }}
        >
          {message}
        </p>
      )}

    </div>
  );
};

export default CombineRule;
