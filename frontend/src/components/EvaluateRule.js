import React, { useState, useEffect } from 'react';
import { evaluateRule, getRules } from '../services/ruleService'; // Assuming these services use axios

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      const fetchedRules = await getRules();
      setRules(fetchedRules);
    };

    fetchRules();
  }, []);

  const handleEvaluate = async () => {
    try {
      const response = await evaluateRule(rules[ruleId - 1]._id, data); // Pass dataString directly
      setResult(response.result);
    } catch (error) {
      setResult('Error evaluating rule');
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
    result: {
      marginTop: '20px',
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
    },
    resultTrue: {
      backgroundColor: 'green',
    },
    resultFalse: {
      backgroundColor: 'red',
    },
    resultError: {
      backgroundColor: 'orange',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Evaluate Rule</h2>
      <input
        type="text"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        placeholder="Enter rule ID"
        style={styles.input}
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter JSON data"
        style={{ ...styles.input, height: '100px' }}
      />
      <button onClick={handleEvaluate} style={styles.button}>Evaluate</button>
      {result !== null && (
        <p style={{ 
          ...styles.result, 
          ...(result === true ? styles.resultTrue : result === false ? styles.resultFalse : styles.resultError) 
        }}>
          Result: {result === true ? 'True' : result === false ? 'False' : result}
        </p>
      )}
    </div>
  );
};

export default EvaluateRule;
