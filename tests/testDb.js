const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const mongoose = require('mongoose')

chai.use(sinonChai);

const {superAgent} = require('../helpers/dbHelper')
const {exchangeRatesModel} = require('../helpers/dbHelper');
const {transactionlogsModel} = require('../helpers/dbHelper')
const dbHelper = require('../helpers/dbHelper').dbHelper;

describe('InitiateDb()', function() {
    
    it('should call superagent.get to fetch the data from Europian bank API', function(done) {
      sinon.stub(superAgent, 'get')

      dbHelper.initiateDb();
        expect(superAgent.get).to.have.been.callCount(1)
        done()
      });

})

describe('checkDb()', function () {
  let countDocumentStub
  afterEach (function(){
    countDocumentStub.restore();
  })
  it('should call countDocuments In order to determince the counts of the documents', function (done) {
     countDocumentStub = sinon.stub(exchangeRatesModel, 'countDocuments')

    dbHelper.checkDb();
    expect(countDocumentStub).to.has.been.called
    done()
  });

  it('should call initiateDb when there is no documents in the collection', async function () {
    const helperSpy = sinon.stub(dbHelper, 'initiateDb')
    countDocumentStub = sinon.stub(exchangeRatesModel, 'countDocuments').returns(0)


    await dbHelper.checkDb();
    expect(helperSpy).to.has.been.calledOnce
  });

})

describe('saveTransaction()', function() {
    
  it('should call transcationLogModel.save to save the transaction', function(done) {
   
    const saveDocumentStub = sinon.stub(transactionlogsModel.prototype, 'save')

    dbHelper.saveTransaction();
      expect(saveDocumentStub).to.have.been.callCount(1)
      done()
    });

})

describe('removeCurrencyTable()', function() {
    
  it('should call mongoose.drop to drop the collection', function(done) {
   
    const dropCollectionStub = sinon.stub(mongoose.connection.collections['exchangerates'], 'drop')

    dbHelper.removeCurrencyTable();
      expect(dropCollectionStub).to.have.been.callCount(1)
      done()
    });

})


describe('insertCurrency()', function() {
    
  it('should call exchangeRatesModel.save to save the exchangerate', function(done) {
    const MockCurrency = {sourceCurrency:'USD', targetCurrency:'EURO', rate:1}
    const saveExchangeDocumentStub = sinon.stub(exchangeRatesModel.prototype, 'save')

    dbHelper.insertCurrency(MockCurrency);
      expect(saveExchangeDocumentStub).to.have.been.callCount(1)
      done()
    });

})

