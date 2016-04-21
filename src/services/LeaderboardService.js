import async from 'async';
import _ from 'lodash';
import userScoreRepo from '../db/repos/userScoreRepo';

class LeaderboardService {

  getLeaderboard(userId, leaderboardId, offset, limit, done) {

    async.series(
      {
        userScoreWithRank: (callback) => userScoreRepo.getRank(userId, leaderboardId, callback),
        topScores: (callback) => userScoreRepo.topScores(leaderboardId, offset, limit, callback)
      },
      (err, result) => {
        if (err) {
          return done(err);
        }

        let formatedResult = this._formatLeaderboard(
          result.userScoreWithRank, result.topScores, offset
        );

        done(null, formatedResult);
      }
    )
  }

  _formatLeaderboard(userScoreWithRank, topScores, offset) {
    let userScore = userScoreWithRank.userScore;
    let result = {
      UserId: userScore.userId,
      LeaderboardId: userScore.leaderboardId,
      Score: userScore.score,
      Rank: userScoreWithRank.rank,
      Entries: _.map(topScores, (score, index) => {
        let rank = offset + index + 1;

        return {
          UserId: score.userId,
          Score: score.score,
          Rank: rank
        }
      })
    };

    return result;
  }

}

export default LeaderboardService;