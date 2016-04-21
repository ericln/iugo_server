import express from 'express';
import LeaderboardService from '../../services/LeaderboardService';
let router = express.Router();

function getLeaderboard(req, res, next) {
  let leaderboardService = new LeaderboardService();

  let payload = req.body;

  leaderboardService.getLeaderboard(
    payload.UserId,
    payload.LeaderboardId,
    payload.Offset,
    payload.Limit,
    (err, result) => {

    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', getLeaderboard);

export default router;