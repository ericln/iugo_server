import mongoose from 'mongoose';
import logger from '../lib/logger';
import config from '../lib/config';

import userTransaction from './userTransaction';
import userScore from './userScore';
import userData from './userData';

let mongoUrl = config.mongoUrl;
let attemptCount = 0;
const retryMilliseconds = 5000;
const retryLimit = 12;

function connectWithRetry() {
  logger.debug('connectWithRetry');
  attemptCount++;
  connect(function (err) {
    if (err) {
      logger.error('Failed to connect to mongo on startup', {
        error: err,
        attemptCount: attemptCount
      });

      if (attemptCount >= retryLimit) {
        throw err;
      }
      else {
        setTimeout(connectWithRetry, retryMilliseconds);
      }
    }
  })
}

function connect(done) {
  logger.debug('connect');
  mongoose.connect(mongoUrl, function(err) {
    if (err) {
      logger.error('Error using mongoose to connect to mongo', { mongoUrl: mongoUrl, error: err });
      return done(err);
    }

    done();
  });
}

//Kick things off
connectWithRetry();

export default {
  UserTransaction: userTransaction,
  UserScore: userScore,
  UserData: userData
}