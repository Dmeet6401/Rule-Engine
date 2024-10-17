import axios from 'axios';

const API_URL = "http://localhost:5000/api/rules";

export const createRule = async (ruleString) => {
  console.log(ruleString);
  
  const response = await axios.post(`${API_URL}/create_rule`, { ruleString });
  return response.data;
};

export const getRules = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const evaluateRule = async (ruleId, jsonData) => {
  // console.log(ruleId, typeof(jsonData));
  const response = await axios.post(`${API_URL}/evaluate_rule`, { ruleId, jsonData });
  return response.data;
};
