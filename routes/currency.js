const express = require('express');
const router = express.Router();

const mathHelper = require("../helpers/mathHelper").mathHelper;
const dbHelper = require("../helpers/dbHelper").dbHelper;

router.get('/', async function (req, res, next) {
  if (!req.query.sourcecurrency || !req.query.sourceamount || !req.query.targetcurrency) {
    return errorMessage(res, 'Enter a valid sourceamount')
  } else if (isNaN(req.query.sourceamount)) {
     return errorMessage(res,'Enter valid sourceammount')
 
  }

  try {
    await dbHelper.checkDb();

    const sourceCurrency = req.query.sourcecurrency.toUpperCase();
    const sourceAmount = req.query.sourceamount;
    const targetCurrency = req.query.targetcurrency.toUpperCase();
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


function errorMessage(res, message){
  res.status(400).send({ //errorMessage(res, message)
       success: 'false',
       message: message
     })
}

module.exports = router;