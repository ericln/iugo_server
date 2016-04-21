import express from 'express';
import DateTimeService from '../../services/DateTimeService';

let router = express.Router();

function getTimestamp(req, res, next) {
  let dateTimeService = new DateTimeService();
  let result = dateTimeService.getCurrentTimestamp();

  res.status(200).send(result);
}

router.get('/', getTimestamp);

export default router;