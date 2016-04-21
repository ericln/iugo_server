import async from 'async';
import _ from 'lodash';
import userDataRepo from '../db/repos/userDataRepo';

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
}

export default UserService;