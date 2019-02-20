
const chai = require("chai");
const sinonChai = require("sinon-chai");
const sinon = require('sinon')
const expect = chai.expect;
chai.use(sinonChai);

const {multFloat} = require('../helpers/mathHelper').mathHelper;
const {divideFloat} = require('../helpers/mathHelper').mathHelper;
const {convertMoney} = require('../helpers/mathHelper').mathHelper;
const exchangeRatesModel = require('../helpers/mathHelper').exchangeRatesModel
const mathHelper = require('../helpers/mathHelper').mathHelper

describe('multFloat', function () {
    it('multFloat() should return the multiplication result of the passed values', function () {
  
      expect(multFloat(10, 2)).to.equal(20);
    });
    it('multFloat() should return integer if we passed integers values', function () {
  
      expect(multFloat(1, 2)).to.equal(2.0);
    });
  
    it('multFloat() should return float if we passed float values', function () {
  
      expect(multFloat(0.1, 0.2)).to.equal(0.02);
  
  });
  })

  describe('divideFloat', function () {
    it('divideFloat() should return the quotient result of the passed values', function () {
  
      expect(divideFloat(10, 2)).to.equal(5);
      expect(divideFloat(1, 2)).to.equal(0.5);

    });
  })

  describe('convertMoney', function () {
    it('convertMoney() should call mongoose.findOne()', function () {
      const exchangeRatesModelStub = sinon.stub(exchangeRatesModel, 'findOne')
      convertMoney()

      expect(exchangeRatesModelStub).to.have.been.calledOnce;

    });

    it('convertMoney() should call multFloat', async function () {
        const multFloatStub = sinon.stub(mathHelper, 'multFloat')
        const exchangeRatesModelStub = sinon.stub(exchangeRatesModel, 'findOne').returns({'exchangeRate':'1'})

        await convertMoney()
  
        expect(multFloatStub).to.have.been.callCount(1);
  
      });
      afterEach(function (){
        sinon.restore()
      })
  })




