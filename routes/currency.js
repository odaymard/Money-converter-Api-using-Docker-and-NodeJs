const express = require('express');
const router = express.Router();

const mathHelper = require("../helpers/mathHelper").mathHelper;
const dbHelper =  require("../helpers/dbHelper").dbHelper;

router.get('/', async function(req, res) {
  try {
    await dbHelper.checkDb();

    const sourceCurrency = req.query.sourceCurrency;
    const sourceAmount = req.query.sourceAmount;
    const targetCurrency = req.query.targetCurrency;
    const [converted, exchangeRate] = await mathHelper.convertMoney(sourceCurrency, sourceAmount, targetCurrency);
    
    dbHelper.saveTransaction(sourceCurrency, sourceAmount,exchangeRate, targetCurrency)

    res.json({'result': converted});
  } catch (err) {
    console.log(err);
    throw (err)
  }
});


module.exports = router;