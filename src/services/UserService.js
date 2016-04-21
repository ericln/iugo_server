import async from 'async';
import _ from 'lodash';
import userDataRepo from '../db/repos/userDataRepo';
import objectCleaner from '../helper/objectCleaner';

class UserService {

  updateUserData(userId, data, done) {
    userDataRepo.updateUserData(userId, data, (err) => {
      if(err) {
        return done(err);
      }

      done(null, {
        Success: true
      })
    });
  }

  getUserData(userId, done) {
    userDataRepo.getUserData(userId, (err, userData) => {
      if(err) return done(err);

      if(userData) {
        return done(null, userData.data);
      }

      done(null, {});
    });
  }
}

export default UserService;