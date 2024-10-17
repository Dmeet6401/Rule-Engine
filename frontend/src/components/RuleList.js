import React, { useState, useEffect } from 'react';
import { getRules } from '../services/ruleService';

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      const fetchedRules = await getRules();
      setRules(fetchedRules);
    };

    fetchRules();
  }, []);

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
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Existing Rules</h2>
      <ul style={styles.list}>
        {rules.map((rule, index) => (
          <li key={rule._id} style={styles.listItem}>
            {index + 1}. {rule.ruleString}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;
