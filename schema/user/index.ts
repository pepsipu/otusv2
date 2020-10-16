import mongoose from 'mongoose';
import registerSchema from './register';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
});

const User = mongoose.model('User', userSchema);

export { userSchema, User, registerSchema };
