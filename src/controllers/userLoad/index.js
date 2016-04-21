import express from 'express';
import UserService from '../../services/UserService';
let router = express.Router();

function getUserData(req, res, next) {
  let userService = new UserService();

  let userId = req.body.UserId;

  userService.getUserData(
    userId,
    (err, result) => {

    if(err) {
      return next(err);
    }

    res.status(200).send(result);
  });
}

router.post('/', getUserData);

export default router;