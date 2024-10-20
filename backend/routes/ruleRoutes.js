const express = require('express');
const { createRule, combineRules, evaluateRule, getAll, removeRule } = require('../controller/ruleController');

const router = express.Router();
router.get('/', getAll);
router.post('/create_rule', createRule);
router.post('/combine_rules', combineRules);
router.post('/evaluate_rule', evaluateRule);
router.post('/remove_rule', removeRule);

module.exports = router;
  