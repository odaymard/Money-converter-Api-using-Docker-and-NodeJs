const chai = require("chai");

const {normalizeExchangeRate} = require('../helpers/helper').helper;
const {getAllCurrencies} = require('../helpers/helper').helper;

const expect = chai.expect;

const mockExchangeRates = [{
    '$': {
      currency: 'USD',
      rate: '1.1294'
    }
  },
  {
    '$': {
      currency: 'JPY',
      rate: '125.09'
    }
  },
  {
    '$': {
      currency: 'ZAR',
      rate: '16.0000'
    }
  }
]
let mockedNormalizedExchangeResult = []
mockedNormalizedExchangeResult['EUROUSD'] = {
  sourceCurrency: 'EURO',
  targetCurrency: 'USD',
  rate: '1.1294'
},
mockedNormalizedExchangeResult['EUROJPY'] = {
  sourceCurrency: 'EURO',
  targetCurrency: 'JPY',
  rate: '125.09'
},
mockedNormalizedExchangeResult['EUROZAR'] = {
  sourceCurrency: 'EURO',
  targetCurrency: 'ZAR',
  rate: '16.0000'
}
const mockedCurrencies = ['EURO', 'USD', 'JPY', 'ZAR']


describe('normalizeExchangeRate', function () {
  it('returns an array', function () {
    const result = normalizeExchangeRate(mockExchangeRates)
    expect(result).to.not.empty
    expect(result).to.be.an('array')


  })
  it('returns the supported currencies', function () {
    const result = normalizeExchangeRate(mockExchangeRates)

    expect(result[1]).to.eql(mockedCurrencies)

  })

  it('returns the normalized exchange rates', function () {
    const result = normalizeExchangeRate(mockExchangeRates)

    expect(result[0]).to.eql(mockedNormalizedExchangeResult)

  })
})

describe('getAllCurrencies',  function () {
  it('return normalized exchange rates for each currency against the other',function(){
   const result = getAllCurrencies(mockedNormalizedExchangeResult, mockedCurrencies)
   expect(Object.keys(result).length).to.eql(12)
  })

})