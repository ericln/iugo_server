import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userScoreSchema = new Schema({
  userId: {type: Number, require: true},
  leaderboardId: {type: Number, require: true},
  score: {type: Number, require: true}
}, {
  collection: 'userScores'
});

export default mongoose.model('UserScore', userScoreSchema);