import React, { useState } from 'react';
import RuleInput from './components/RuleInput';
import RuleList from './components/RuleList';
import EvaluateRule from './components/EvaluateRule';
import CombineRule from './components/CombineRule';

const App = () => {
  const [isCombineRuleVisible, setCombineRuleVisible] = useState(false);

  const toggleCombineRule = () => {
    setCombineRuleVisible(!isCombineRuleVisible);
  };

  return (
    <div style={styles.container}>
      <RuleInput />
      <RuleList />
      
      {/* <button onClick={toggleCombineRule} style={styles.toggleButton}>
        {isCombineRuleVisible ? 'Hide Combine Rule' : 'Show Combine Rule'}
      </button> */}
      
      <CombineRule />


      <EvaluateRule />
    </div>
  );
};

const styles = {
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center', // Center items horizontally
  //   // justifyContent: 'center', // Center items vertically
  //   height: '100vh', // Full height of the viewport
  //   padding: '20px',
  //   backgroundColor: '#f0f0f0', // Optional background color
  // },
  toggleButton: {
    margin: '20px 0',
    padding: '10px 15px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  combineRuleContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    width: '100%', // Optional to make the container full width
    maxWidth: '600px', // Optional to limit the width
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default App;
