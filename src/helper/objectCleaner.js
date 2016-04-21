
function cleanDbObject(object) {
  let trueObject = {};

  if(object.toObject) {
    trueObject = object.toObject();
  }
  else {
    trueObject = object;
  }

  delete trueObject._id;
  delete trueObject.__v;

  return trueObject;
}

export default {
  cleanDbObject
}