import async from 'async';
import _ from 'lodash';
import userScoreRepo from '../db/repos/userScoreRepo';

class ScoreService {
  recordUserScore(payload, done) {

    async.waterfall(
      [
        (callback) => userScoreRepo.getUserLeaderboardScore(payload.UserId, payload.LeaderboardId, callback),
        (currentUserScore, callback) => this._updateUserScore(currentUserScore, payload, callback),
        (callback) => userScoreRepo.getRank(payload.UserId, payload.LeaderboardId, callback)
      ],
      (err, result) => {
        if(err) {
          return done(err);
        }

        done(null, {
          UserId: result.userScore.userId,
          LeaderboardId: result.userScore.leaderboardId,
          Score: result.userScore.score,
          Rank: result.rank
        });
      }
    )
  }


  _updateUserScore(currentScore, payload, done) {

    if(payload.Score <= currentScore.score) {
      return done();
    }

    userScoreRepo.updateUserScore(payload.UserId, payload.LeaderboardId, payload.Score, (err) => {
      if(err) {
        return done(err);
      }

      done();
    });
  }
}

export default ScoreService;