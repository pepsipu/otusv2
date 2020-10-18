import mongoose, { Document } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { bcryptRounds } from '../../config/config.json';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
});

const User = mongoose.model('User', userSchema);

const createUser = async (
  username: string,
  password: string,
  email: string,
): Promise<Document | null> => {
  if (await User.exists({
    $or: [
      { username },
      { email },
    ],
  })) {
    return null;
  }
  const passwordHash = await hash(password, await genSalt(bcryptRounds));
  const user = new User({ username, email, passwordHash });
  await user.save();
  return user;
};

export { createUser, userSchema, User };
