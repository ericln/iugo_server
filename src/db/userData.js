import mongoose from 'mongoose';
let Schema = mongoose.Schema;


let userDataSchema = new Schema({
  userId: {type: Number, require: true, index: { unique: true }},
  data: {type: Schema.Types.Mixed}
}, {
  collection: 'userData'
});

export default mongoose.model('UserData', userDataSchema);