const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  country: String,

  passwordHash: String,
  emailHash: String,

  badges: [{
    backgroundColor: String,
    color: String,
    text: String,
    tooltip: String,
  }],

  ctf: {
    // weighted average of all points scored from solving challenges
    pp: Number,
    solves: [{
      challenge: mongoose.Types.ObjectId,
      timestamp: Date,
      // rank when this challenge was solved, useful for generating rank vs time graph
      position: Number,
    }],
  },
});

const User = mongoose.model('User', userSchema);

const getUsers = async (filter) => User.find(filter);
const getUser = async (username) => User.findOne({ username });

const userCount = async () => User.countDocuments({});

const giveBadge = async (username, badge) => User.findOneAndUpdate({ username }, {
  $push: {
    badges: badge,
  },
}, {
  new: true,
});
const clearBadges = async (username) => User.findOneAndUpdate({}, {
  $set: {
    badges: [],
  },
}, (err) => console.log(err));

const badges = {
  contributor: {
    backgroundColor: '#1f1f1f',
    color: '#f05d5e',
    text: 'contributor',
    tooltip: 'contributed to the otus platform',
  },
  owner: {
    backgroundColor: '#1f1f1f',
    color: '#cab826',
    text: 'pepsi🥤',
    tooltip: 'platform creator',
  },
};

module.exports = {
  User, userCount, getUsers, getUser, giveBadge, clearBadges, badges,
};
