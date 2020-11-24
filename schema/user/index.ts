import mongoose, { Document } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { createHash } from 'crypto';
import { bcryptRounds } from '../../config/config.json';

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

export interface IUser extends Document {
  username: string,
  email: string,
  country: string,
  passwordHash: string,
  emailHash: string
  badges: { backgroundColor: string, color: string, text: string, tooltip: string }[],
  ctf: {
    pp: number,
    solves: { challenge: mongoose.Types.ObjectId, timestamp: Date, position: number }[]
  }
}

const User = mongoose.model<IUser>('User', userSchema);

const createUser = async (
  username: string,
  password: string,
  email: string,
  country: string,
): Promise<IUser | null> => {
  if (await User.exists({
    $or: [
      { username },
      { email },
    ],
  })) {
    return null;
  }
  const passwordHash = await hash(password, await genSalt(bcryptRounds));
  const user = new User({
    username,
    email,
    country,
    passwordHash,
    emailHash: createHash('md5').update(email).digest('hex'),
    badges: [],
    ctf: {
      pp: 0,
      solves: [],
    },
  });
  await user.save();
  return user;
};

export { createUser, userSchema, User };
