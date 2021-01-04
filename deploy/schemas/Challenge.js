const mongoose = require('mongoose');

const UNRANKED = -1;

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
const getChallenges = async () => Challenge.find();
const deleteChallenge = async (id) => Challenge.deleteOne({ _id: id });
const setPoints = async (id, points) => Challenge.findOneAndUpdate({ _id: id }, { points });
const getChallenge = async (name) => Challenge.find({ name });

module.exports = {
  Challenge,
  UNRANKED,
  challengeCount,
  rankedCount,
  getChallenges,
  deleteChallenge,
  setPoints,
  getChallenge,
};
