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
    color: String,
    text: String,
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
  badges: { color: string, text: string }[],
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
  });
  await user.save();
  return user;
};

export { createUser, userSchema, User };
