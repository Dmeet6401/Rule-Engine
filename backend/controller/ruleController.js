const Rule = require('../models/ruleModel');
const { tokenize, buildAST, evaluateAST, parseDataString } = require('../helpers/astHelper');

exports.getAll = async (req, res) => {
  try {
    const rules = await Rule.find({});
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving rules', error: error.message });
  }
}

// Create a new rule
exports.createRule = async (req, res) => {
  const { ruleString } = req.body;
  try {
    const tokens = tokenize(ruleString);
    const ast = buildAST(tokens);
    const newRule = new Rule({ ruleString, ast });
    await newRule.save();
    res.status(201).json({ message: 'Rule created successfully', ast });
  } catch (error) {
    res.status(400).json({ message: 'Error creating rule', error: error.message });
  }
};

// Combine multiple rules
exports.combineRules = (req, res) => {
  const { ruleStrings } = req.body;
  try {
    const asts = ruleStrings.map((ruleString) => {
      const tokens = tokenize(ruleString);
      return buildAST(tokens);
    });
    const combinedAST = combineASTs(asts);  // Logic to combine ASTs
    res.json({ combinedAST });
  } catch (error) {
    res.status(400).json({ message: 'Error combining rules', error: error.message });
  }
};

// Evaluate a rule
exports.evaluateRule = async (req, res) => {

  const { ruleId, jsonData } = req.body;

  try {
    const rule = await Rule.findById(ruleId);

    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }
    const data = parseDataString(jsonData);  // Parse data string into object
    const result = evaluateAST(rule.ast, data);
    console.log("result",result);
    
    res.json({ result });
  } catch (error) {
    res.status(400).json({ message: 'Error evaluating rule', error: error.message });
  }
};
