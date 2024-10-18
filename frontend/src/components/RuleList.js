import React, { useState, useEffect } from 'react';
import { getRules, removeRule } from '../services/ruleService'; // Assuming removeRule is a service that handles removal

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      const fetchedRules = await getRules();
      setRules(fetchedRules);
    };

    fetchRules();
  }, []);

  // Handle rule removal
  const handleRemoveRule = async (ruleId) => {
    
    try {
      await removeRule(ruleId); // Call the service to remove the rule
      setRules(rules.filter(rule => rule._id !== ruleId)); // Update the state to remove the rule from the list
    } catch (error) {
      console.error('Error removing rule:', error);
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
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      display: 'flex', // Added to arrange items in a row
      justifyContent: 'space-between', // Space between rule text and button
      alignItems: 'center', // Align items vertically centered
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
    removeButton: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Existing Rules</h2>
      <ul style={styles.list}>
        {rules.map((rule,index) => (
          <li key={rule._id} style={styles.listItem}>
            {index+1}. {rule.ruleString}
            <button onClick={() => handleRemoveRule(rule._id)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;
