const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeRateSchema = new Schema({
  sourceCurrency: {
    type: String,
    required: true
  },
  targetCurrency: {
    type: String,
    required: true
  },
  exchangeRate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('exchangeRates', exchangeRateSchema);