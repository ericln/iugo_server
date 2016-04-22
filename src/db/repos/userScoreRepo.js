import async from 'async';
import db from '../index';

/**
 * Get paged top scores for a leaderboard
 * @param leaderboardId leaderboard identifer
 * @param offset number of scores to skip
 * @param limit number of scores per page
 * @param done completed callback
 */
function topScores(leaderboardId, offset, limit, done) {
  db.UserScore.aggregate(
    [
      {$match: {leaderboardId: leaderboardId}},
      {$sort: {score: -1, userId: 1}},
      {$skip: offset},
      {$limit: limit}
    ],
    done
  )
}

/**
 * Get user's current leaderboard score
 * @param userId user identifier
 * @param leaderboardId leaderboard identifier
 * @param done completed callback
 */
function getUserLeaderboardScore(userId, leaderboardId, done) {
  db.UserScore.findOneAndUpdate(
    {userId: userId, leaderboardId: leaderboardId},
    {$setOnInsert: {userId: userId, leaderboardId: leaderboardId, score: 0}},
    {new: true, upsert: true},
    done
  );
}

/**
 * update a user's leader board score
 */
function updateUserScore(userId, leaderboardId, score, done) {
  db.UserScore.update(
    {userId: userId, leaderboardId: leaderboardId},
    {$set: {score: score}},
    {},
    done
  )
}

/**
 * get the user's rank for the given leaderboard
 * @param userId user identifier
 * @param leaderboardId leaderboard identifier
 * @param done completed callback
 */
function getRank(userId, leaderboardId, done) {

  async.waterfall(
    [
      (callback) => getUserLeaderboardScore(userId, leaderboardId, callback),
      (userScore, callback) => _getUserScoreAndRank(userScore, leaderboardId, callback)
    ],
    (err, result) => {
      if (err) {
        return done(err);
      }

      done(null, result);
    }
  )
}

function _getUserScoreAndRank(userScore, leaderboardId,  done) {
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