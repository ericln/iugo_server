import express from 'express';
import ScoreService from '../../services/ScoreService';
let router = express.Router();

function recordUserScore(req, res, next) {
  let scoreService = new ScoreService();

  let payload = req.body;

  scoreService.recordUserScore(payload, (err, result) => {
    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', recordUserScore);

export default router;