import express from 'express';
import UserService from '../../services/UserService';
let router = express.Router();

function getLeaderboard(req, res, next) {
  let userService = new UserService();

  let payload = req.body;

  userService.updateUserData(
    payload.UserId,
    payload.Data,
    (err, result) => {

    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', getLeaderboard);

export default router;