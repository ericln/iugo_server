import async from 'async';
import transactionValidator from './transactionValidator';

class TransactionService {

  createTransaction(key, payload, done) {

    let isValidTransaction = transactionValidator.validateTransaction(
      key,
      payload.TransactionId,
      payload.UserId,
      payload.CurrencyAmount,
      payload.Verifier
    );

    done(null, isValidTransaction);
  }
}

export default TransactionService;