const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transcationLogSchema = new Schema({
  sourceCurrency: {
    type: String,
    required: true
  },
  targetCurrency: {
    type: String,
    required: true
  },
  sourceAmount: {
    type: Number,
    required: true
  },
  exchangeRate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('transcationLogs', transcationLogSchema);