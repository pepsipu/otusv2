const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: String,
  author: mongoose.Types.ObjectId,
  flag: String,
  categories: [String],
  description: String,
  solves: [{
    playerId: mongoose.Types.ObjectId,
    timestamp: Date,
  }],
  points: Number,
});

const Challenge = mongoose.model('Challenge', challengeSchema);

const challengeCount = async () => Challenge.countDocuments({});
const rankedCount = async () => Challenge.countDocuments({ points: { $ne: -1 } });

module.exports = { Challenge, challengeCount, rankedCount };
