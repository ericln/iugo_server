import async from 'async';
import db from '../index';

function updateUserData(userId, data, done) {
  let updateData = _generateSetObject(data);

  db.UserData.findOneAndUpdate(
    {userId: userId},
    {
      $set: updateData
    },
    {
      new: true,
      upsert: true
    },
    done
  );
}

function _generateSetObject(data) {
  let resultObject = {};

  Object.keys(data).forEach((prop) => {
    resultObject[`data.${prop}`] = data[prop];
  });

  return resultObject;
}

export default {
  updateUserData
}