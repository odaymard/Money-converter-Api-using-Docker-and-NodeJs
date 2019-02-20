const exchangeRatesModel = require('../models/exchangeRates')
/**
 *helps in dividing numbers(currency rate)
 and gives an accurate result
 *
 * @param {*} rateFrom
 * @param {*} rateTarget
 * @returns
 */
function divideFloat(rateFrom, rateTarget) {
  rateFrom = rateFrom.toString();
  rateTarget = rateTarget.toString();
  const rateFromFraction = (rateFrom.length - rateFrom.indexOf('.')) - 1
  const rateTargetFraction = (rateTarget.length - rateTarget.indexOf('.')) - 1
  const res = (rateFrom * Math.pow(10, rateFromFraction + rateTargetFraction)) / (Math.pow(10, rateFromFraction + rateTargetFraction) * rateTarget)
  return +res.toFixed(rateFrom.length + rateTarget.length);
}
/**
 * helps in multiplying numbers(currency ammount and rate)
 * and give an accurate result.
 * @param {*} value
 * @param {*} rate
 * @returns
 */
function multFloat(value, rate) {

  value = value.toString();
  rate = rate.toString();
  const valueFraction = (value.length - value.indexOf('.')) - 1
  const rateFraction = (rate.length - rate.indexOf('.')) - 1
  const res = (value * Math.pow(10, valueFraction + rateFraction) * rate) / Math.pow(10, valueFraction + rateFraction)
  return +res.toFixed(valueFraction + rateFraction);
}
/**
 * convert a specific ammount of money from source currency to the target currency
 *
 * @param {*} sourceCurrency
 * @param {*} sourceAmount
 * @param {*} targetCurrency
 * @returns  the converted result
 */
const convertMoney = async function (sourceCurrency, sourceAmount, targetCurrency) {
  try {

    const result = await exchangeRatesModel.findOne({
      sourceCurrency: sourceCurrency,
      targetCurrency: targetCurrency
    })
    const convertedMoney = mathHelper.multFloat(sourceAmount, result.exchangeRate)
    return [convertedMoney, result.exchangeRate];
  } 
  catch (err) {
    throw (err)
  }



}



const mathHelper = {
  divideFloat,
  multFloat,
  convertMoney

}

module.exports.mathHelper = mathHelper
module.exports.exchangeRatesModel = exchangeRatesModel