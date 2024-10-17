const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  ruleString: {
    type: String,
    required: true,
  },
  ast: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('Rule', RuleSchema);
