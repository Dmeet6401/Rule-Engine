import React from 'react';
import RuleInput from './components/RuleInput';
import RuleList from './components/RuleList';
import EvaluateRule from './components/EvaluateRule';

const App = () => {
  return (
    <div>
      <RuleInput />
      <RuleList />
      <EvaluateRule />
    </div>
  );
};

export default App;
