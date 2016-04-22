import { expect } from 'chai';
import transactionValidator from '../../src/services/transactionValidator';

describe('transactionValidator', () => {
  context('UserId', () => {

    const testData = {
      "TransactionId": 1,
      "CurrencyAmount": 3,
      "Verifier": "fd6b91387c2853ac8467bb4d90eac30897777fc6"
    };

    it('correct userId return true', () => {
      let correctUserId = 2;
      let result = transactionValidator.validateTransaction(
        testData.TransactionId,
        correctUserId,
        testData.CurrencyAmount,
        testData.Verifier
      );

      expect(result).to.be.true;
    });

    it('incorrect userId return false', () => {
      let wrongUserId = 10;
      let result = transactionValidator.validateTransaction(
        testData.TransactionId,
        wrongUserId,
        testData.CurrencyAmount,
        testData.Verifier
      );

      expect(result).to.be.false;
    });
  });
});