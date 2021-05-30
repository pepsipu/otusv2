const mongoose = require('mongoose');
const user = require('./User');

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
const deleteChallenge = async (id) => Challenge.findByIdAndDelete(id);
const setPoints = async (id, points) => Challenge.findByIdAndUpdate(id, { points });
const getChallenge = async (name) => Challenge.find({ name });
const revokeSolve = async (id, username) => {
  const { id: userId } = await user.getUser(username);
  await Challenge.findByIdAndUpdate(id, {
    $pull: {
      solves: {
        playerId: userId,
      },
    },
  });
  // await user.User.findByIdAndUpdate(userId, {
  //   $pull: {
  //     'ctf.solves': {
  //       challenge: id,
  //     },
  //   },
  //   $inc: {
  //     'ctf.pp': -points,
  //   },
  // });
};

module.exports = {
  Challenge,
  UNRANKED,
  challengeCount,
  rankedCount,
  getChallenges,
  deleteChallenge,
  setPoints,
  getChallenge,
  revokeSolve,
};
