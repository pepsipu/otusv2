import mongoose, { Document } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { createHash } from 'crypto';
import { bcryptRounds } from '../../config/config.json';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  emailHash: String,
  publicId: String,
  badges: [{
    color: String,
    text: String,
  }],
  rank: Number,
});

export interface IUser extends Document {
  username: string,
  email: string,
  passwordHash: string,
  emailHash: string
  publicId: string,
  badges: { color: string, text: string }[],
  rank: number,
}

const User = mongoose.model<IUser>('User', userSchema);

const createUser = async (
  username: string,
  password: string,
  email: string,
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
    passwordHash,
    emailHash: createHash('md5').update(email).digest('hex'),
    badges: [],
  });
  user.publicId = createHash('sha1').update(user.id).digest('hex');
  await user.save();
  return user;
};

export { createUser, userSchema, User };
