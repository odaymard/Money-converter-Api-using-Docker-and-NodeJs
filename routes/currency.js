const express = require('express');
const router = express.Router();

const mathHelper = require("../helpers/mathHelper").mathHelper;
const dbHelper = require("../helpers/dbHelper").dbHelper;

router.get('/', async function (req, res, next) {
  if (!req.query.sourcecurrency || !req.query.sourceamount || !req.query.targetcurrency) {
    return res.status(400).send({
      success: 'false',
      message: 'sourceammount, targetcurrency and sourcecurrency are required '
    })
  }

  try {
    await dbHelper.checkDb();

    const sourceCurrency = req.query.sourcecurrency;
    const sourceAmount = req.query.sourceamount;
    const targetCurrency = req.query.targetcurrency;
    const [converted, exchangeRate] = await mathHelper.convertMoney(sourceCurrency, sourceAmount, targetCurrency);

    dbHelper.saveTransaction(sourceCurrency, sourceAmount, exchangeRate, targetCurrency)

    return res.status(200).send({
      result: converted,
      success: 'true'
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
});


module.exports = router;