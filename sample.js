class Node {
  constructor(type, value = null, left = null, right = null) {
      this.type = type;  // 'operator' or 'operand'
      this.value = value; // condition (for operands) or operator (for operators)
      this.left = left;   // left child (Node)
      this.right = right; // right child (Node)
  }
}

function tokenize(ruleString) {
  const regex = /\s*(AND|OR|\(|\)|[a-zA-Z0-9_><=!']+)\s*/g;
  return ruleString.match(regex).map(token => token.trim()).filter(Boolean);
}

function buildAST(tokens) {
  let index = 0;

  function parseExpression() {
      let node = parseTerm();

      while (index < tokens.length && tokens[index] === 'OR') {
          let operator = tokens[index];
          index++;
          let right = parseTerm();
          node = new Node('operator', operator, node, right);
      }

      return node;
  }

  function parseTerm() {
      let node = parseFactor();

      while (index < tokens.length && tokens[index] === 'AND') {
          let operator = tokens[index];
          index++;
          let right = parseFactor();
          node = new Node('operator', operator, node, right);
      }

      return node;
  }

  function parseFactor() {
      let token = tokens[index];

      if (token === '(') {
          index++;
          let node = parseExpression();
          index++; // Skip closing ')'
          return node;
      }

      // Combine operand, operator, and value into one condition
      let left = token;
      index++;
      if (index < tokens.length) {
          let operator = tokens[index];
          index++;
          let right = tokens[index];
          index++;
          return new Node('operand', `${left} ${operator} ${right}`);
      }

      throw new Error('Invalid expression format');
  }

  return parseExpression();
}

function evaluateAST(node, data) {
  if (node.type === 'operand') {
      return evalCondition(node.value, data);
  } else if (node.type === 'operator') {
      let leftEval = evaluateAST(node.left, data);
      let rightEval = evaluateAST(node.right, data);

      if (node.value === 'AND') {
          return leftEval && rightEval;
      } else if (node.value === 'OR') {
          return leftEval || rightEval;
      }
  }
}

function evalCondition(condition, data) {
  const match = condition.match(/^([a-zA-Z_]+)\s*([><=!]+)\s*([a-zA-Z0-9'"]+)$/);

  if (!match) {
      throw new Error(`Invalid condition format: ${condition}`);
  }

  let [ , attr, operator, value ] = match;

  if (value.startsWith("'") || value.startsWith('"')) {
      value = value.replace(/['"]+/g, '');
  } else {
      value = parseFloat(value);
  }

  if (operator === '>') return data[attr] > value;
  if (operator === '<') return data[attr] < value;
  if (operator === '>=') return data[attr] >= value;
  if (operator === '<=') return data[attr] <= value;
  if (operator === '==') return data[attr] == value;
  if (operator === '!=') return data[attr] != value;

  throw new Error(`Invalid operator: ${operator}`);
}

// New function to convert string input to a valid object
function parseDataString(dataString) {
  // Convert the string into a valid JavaScript object
  try {
      // Use eval to turn the string into an object
      return eval(`(${dataString})`);
  } catch (error) {
      throw new Error('Invalid data format');
  }
}

// const ruleString = "(age > 30 AND department == 'Sales') OR (age < 25 AND department == 'Marketing')";
const ruleString = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const tokens = tokenize(ruleString);

const ast = buildAST(tokens);

const dataString = `{ age: 35, department: 'Sales' }`; // Input as string
const data = parseDataString(dataString);  // Parse the string into an object

const result = evaluateAST(ast, data);

const dataString2 = `{ age: 24, department: 'Marketing' }`;
const data2 = parseDataString(dataString2);
const result2 = evaluateAST(ast, data2);

const dataString3 = `{ age: 26, department: 'Sales', salary: 51000, experience: 8 }`;
const data3 = parseDataString(dataString3);
const result3 = evaluateAST(ast, data3);
