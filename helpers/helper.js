const mathHelper = require('./mathHelper').mathHelper
/**
 * 
  Calculate and derive currency values ​​against each other
  by comparing the values ​​of currencies against the euro,
  the result is a key value object in which the key is the 
  source and target currencies concatenated together and the value is the exchange rate
  for example   normalizedExchangeRate["USDEURO"] gives me the rate between 
  USD and Euro.
 *
 * @param {exchange rates in the normalized form} normalizedExchangeRate
 * @param {supported currencies} currencies
 * @returns a new normalized rates key value object for all currencies
 */
const getAllCurrencies = function (normalizedExchangeRate, currencies) {

  for (cur in currencies) {
    const sourceCurrency = currencies[cur]
    for (curt in currencies) {
      const targetCurrency = currencies[curt]
      if (targetCurrency !== sourceCurrency) {
        let newrate
        if (targetCurrency === 'EURO') {
          newrate = mathHelper.divideFloat(1, normalizedExchangeRate[`${targetCurrency}${sourceCurrency}`].rate)
          normalizedExchangeRate[`${sourceCurrency}${targetCurrency}`] = {
            sourceCurrency: `${sourceCurrency}`,
            targetCurrency: `${targetCurrency}`,
            rate: newrate
          }
        } else {
          if (!normalizedExchangeRate[`${sourceCurrency}${targetCurrency}`]) {

            const exchangeRateEuroSrc = normalizedExchangeRate[`EURO${sourceCurrency}`].rate
            const exchangeRateEuroTarget = normalizedExchangeRate[`EURO${targetCurrency}`].rate
            newrate = mathHelper.divideFloat(exchangeRateEuroTarget, exchangeRateEuroSrc)
            normalizedExchangeRate[`${sourceCurrency}${targetCurrency}`] = {
              sourceCurrency: `${sourceCurrency}`,
              targetCurrency: `${targetCurrency}`,
              rate: newrate
            }
            normalizedExchangeRate[`${targetCurrency}${sourceCurrency}`] = {
              sourceCurrency: `${targetCurrency}`,
              targetCurrency: `${sourceCurrency}`,
              rate: mathHelper.divideFloat('1', newrate)
            }

          }
        }
      }
    }

  }

  return normalizedExchangeRate
}


/**
 *gives the supported currencies and the normalized exchange rate object
  
 *
 * @param {exchange rates to normalize} exchangeRToNormalize
 * @returns the normalized exchange rate and the supported currencies array
 */
const normalizeExchangeRate = function (exchangeRToNormalize) {

  let exchangeRate = []
  const currencies = ['EURO'];
  exchangeRToNormalize.forEach((value, index) => {
    exchangeRate[`EURO${value.$.currency}`] = {
      sourceCurrency: 'EURO',
      targetCurrency: value.$.currency,
      rate: value.$.rate
    };
    currencies.push(value.$.currency);
  })
  return [exchangeRate, currencies]
}



const helper = {
  getAllCurrencies,
  normalizeExchangeRate,
}


module.exports.helper = helper;