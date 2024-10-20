import axios from 'axios';
// require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

export const createRule = async (ruleString) => {
  
  const response = await axios.post(`${API_URL}/create_rule`, { ruleString });
  return response.data;
};

export const getRules = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const evaluateRule = async (ruleId, jsonData) => {
  const response = await axios.post(`${API_URL}/evaluate_rule`, { ruleId, jsonData });
  return response.data;
};

export const removeRule = async (ruleId) => {
  const response = await axios.post(`${API_URL}/remove_rule`, { ruleId });
  
  return response.data;
};