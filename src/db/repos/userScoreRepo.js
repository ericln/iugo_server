import async from 'async';
import db from '../index';

function topScores(leaderboardId, offset, limit, done) {
  db.UserScore.aggregate(
    [
      {$match: {leaderboardId: leaderboardId}},
      {$sort: {score: -1}},
      {$skip: offset},
      {$limit: limit}
    ],
    done
  )
}

function getUserLeaderboardScore(userId, leaderboardId, done) {
  db.UserScore.findOneAndUpdate(
    {userId: userId, leaderboardId: leaderboardId},
    {$setOnInsert: {userId: userId, leaderboardId: leaderboardId, score: 0}},
    {new: true, upsert: true},
    done
  );
}

function updateUserScore(userId, leaderboardId, score, done) {
  db.UserScore.update(
    {userId: userId, leaderboardId: leaderboardId},
    {$set: {score: score}},
    {},
    done
  )
}

function getRank(userId, leaderboardId, done) {

  async.waterfall(
    [
      (callback) => getUserLeaderboardScore(userId, leaderboardId, callback),
      (userScore, callback) => _getUserScoreAndRank(userScore, userId, leaderboardId, callback)
    ],
    (err, result) => {
      if (err) {
        return done(err);
      }

      done(null, result);
    }
  )
}

function _getUserScoreAndRank(userScore, userId, leaderboardId,  done) {
  db.UserScore.count(
    {
      leaderboardId: leaderboardId,
      score: {$gt: userScore.score}
    },
    (err, count) => {
      if (err) return done(err);

      done(null, {
        userScore: userScore,
        rank: count + 1
      })
    }
  )
}

export default {
  getUserLeaderboardScore,
  updateUserScore,
  getRank,
  topScores
}