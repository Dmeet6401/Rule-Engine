import React, { useState } from 'react';
import { createRule } from '../services/ruleService';

const RuleInput = () => {
  const [rule, setRule] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await createRule(rule);
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
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    message: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Create a Rule</h2>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule string"
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>Create Rule</button>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

export default RuleInput;
