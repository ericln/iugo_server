import async from 'async';
import db from '../index';

function getUserTransaction(userId, done) {

  db.UserTransaction.findOneAndUpdate(
    {userId: userId},
    {$setOnInsert: {userId: userId, transactions: []}},
    {new: true, upsert: true},
    done
  );

}

function addTransactionToUser(userId, transaction, done) {
  db.UserTransaction.update(
    {userId: userId},
    {
      $push: {transactions: transaction}
    },
    {},
    (err, result) => {
      if(err) {
        return done(err);
      }

      done(null, result.ok===1);
    }
  )
}

function getTransactionStats(userId, done) {
  db.UserTransaction.aggregate(
    [
      {}
    ]
    , done
  )
}

export default {
  getUserTransaction,
  addTransactionToUser,
  getTransactionStats
}