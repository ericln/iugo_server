import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let transactionSchema = new Schema({
    transactionId: {type: Number, require: true},
    currencyAmount: {type: Number, require: true}
  },
  { _id: false }
);

let userTransactionSchema = new Schema({
  userId: {type: Number, require: true},
  transactions: [transactionSchema]
}, {
  collection: 'userTransactions'
});

export default mongoose.model('UserTransactions', userTransactionSchema);