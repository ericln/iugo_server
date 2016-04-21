import async from 'async';
import _ from 'lodash';
import transactionValidator from './transactionValidator';
import userTransactionRepo from '../db/repos/userTransactionRepo';

class TransactionService {

  /**
   * Create a new transaction for the user if it is not already existed.
   * @param key secret key
   * @param payload transaction request payload
   * @param done completed callback function
   */

  createTransaction(payload, done) {

    async.waterfall([
      (callback) => this._transactionCheck(payload, callback),
      (callback) => userTransactionRepo.getUserTransaction(payload.UserId, callback),
      (userTransaction, callback) => this._addTransaction(userTransaction, payload, callback)
    ], (err, result) => {

      // async way of breaking the flow without returnning error.
      if (err && err !== true) {
        return done(err);
      }

      done(null, {
        Success: result
      });
    });
  }

  _transactionCheck(payload, done) {
    let isValidTransaction = transactionValidator.validateTransaction(
      payload.TransactionId,
      payload.UserId,
      payload.CurrencyAmount,
      payload.Verifier
    );

    if (!isValidTransaction) {
      return done(true, false);
    }

    done();
  }

  _addTransaction(userTransaction, payload, done) {
    let newTransaction = {
      transactionId: payload.TransactionId,
      currencyAmount: payload.CurrencyAmount
    };

    let exist = _.some(
      userTransaction.transactions, {transactionId: payload.TransactionId}
    );

    if (exist) {
      return done(null, false);
    }

    userTransactionRepo.addTransactionToUser(
      payload.UserId,
      newTransaction,
      (err, result) => {
        if (err) {
          return done(err);
        }

        done(null, result);
      }
    );
  }
}

export default TransactionService;