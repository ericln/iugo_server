import express from 'express';
import TransactionService from '../../services/TransactionService';

let router = express.Router();

function getUserTransactionStats(req, res, next) {
  let transactionService = new TransactionService();

  let userId = req.body.UserId;

  //todo: check userid

  transactionService.getUserTransactionStats(userId, (err, result) => {

    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', getUserTransactionStats);

export default router;