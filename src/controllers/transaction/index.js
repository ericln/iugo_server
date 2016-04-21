import express from 'express';
import TransactionService from '../../services/TransactionService';

let router = express.Router();

function createTransaction(req, res, next) {
  let transactionService = new TransactionService();

  let payload = req.body;

  transactionService.createTransaction(payload, (err, result) => {

    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', createTransaction);

export default router;