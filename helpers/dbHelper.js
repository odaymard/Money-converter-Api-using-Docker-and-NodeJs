const xml2js = require('xml2js');
const mongoose = require('mongoose')
const util = require('util');
const superAgent = require('superagent');

const exchangeRatesModel = require('../models/exchangeRates')
const transactionlogsModel = require('../models/transactionlogs')
const helper = require('./helper').helper
/**
 *Fetch the xml file from the Central Bank 
  and store the exchange rates for each currency 
  in exchangerate model.
 *
 */
const initiateDb = async function () {

  try {
    const xml = await superAgent
      .get(process.env.EUROPIANBANK)
      .set('accept', 'xml')
    const parser = new xml2js.Parser();
    const exchangeRateXml = xml.text;
    parseStringPromise = util.promisify(parser.parseString);
    const result = await parseStringPromise(exchangeRateXml);
    const currArray = result['gesmes:Envelope'].Cube[0].Cube[0].Cube;
    const [exchangeRate, currencies] = helper.normalizeExchangeRate(currArray)
    const allCurrencies = helper.getAllCurrencies(exchangeRate, currencies)
    for (const element of Object.keys(allCurrencies)) {
      await dbHelper.insertCurrency(allCurrencies[element])
    }
  } catch (err) {
      console.log(err);
      throw err;
  }
}
/**
 *Check if the exchangeRatesModel is empty and call
  InitiateDb to bring new data from the Central Bank Api
 *
 */
const checkDb = async function () {
  try {
    const countDocument = await exchangeRatesModel.countDocuments();
    if (countDocument === 0) {
      await dbHelper.initiateDb();
    }

  } catch (err) {
      throw err;
  }
}

/**
 *Save the transiction into transactionLog collection
 *
 * @param {*} sourceCurrency
 * @param {*} sourceAmount
 * @param {*} exchangeRate
 * @param {*} targetCurrency
 */
const saveTransaction = async function (sourceCurrency, sourceAmount, exchangeRate, targetCurrency) {
  const newTanscationLog = new transactionlogsModel({
    sourceCurrency: sourceCurrency,
    sourceAmount: sourceAmount,
    targetCurrency: targetCurrency,
    exchangeRate: exchangeRate
  });
  
  await newTanscationLog.save()
}
/**
 *remove the exchangeRates collection
  before getting the new exchangerated from Europian Central API 
 *
 */
const removeCurrencyTable = async function () {

  try {
    await mongoose.connection.collections['exchangerates'].drop()
    console.log('Old table has been removed')
  } catch (err) {
      throw err;
  }
}
/**
 *Insert a new currency in the exchangeRate collection
 *
 * @param {*} currencyRate
 */
const insertCurrency = async function (currencyRate) {

  const newExchangeRate = new exchangeRatesModel({
    sourceCurrency: currencyRate.sourceCurrency,
    targetCurrency: currencyRate.targetCurrency,
    exchangeRate: currencyRate.rate
  });
  await newExchangeRate.save()
}


const dbHelper = {
  initiateDb,
  checkDb,
  saveTransaction,
  removeCurrencyTable,
  insertCurrency
}

module.exports.dbHelper = dbHelper
module.exports.superAgent = superAgent;
module.exports.exchangeRatesModel = exchangeRatesModel;
module.exports.transactionlogsModel = transactionlogsModel;
