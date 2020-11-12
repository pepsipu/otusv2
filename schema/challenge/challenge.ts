import mongoose, { Document } from 'mongoose';

const challengeSchema = new mongoose.Schema({
  name: String,
  author: String,
  flag: String,
  categories: [String],
  description: String,
  solves: [{
    playerId: String,
    timestamp: Date,
  }],
  points: Number,
  publicId: String,
});

interface IChallenge extends Document {
  name: string,
  author: string,
  flag: string,
  categories: string[],
  description: string,
  solves: {
    playerId: string,
    timestamp: Date,
  }[],
  points: number
  publicId: string,
}

const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);

export { Challenge, IChallenge };