import mongoose, { Document } from 'mongoose';

const challengeSchema = new mongoose.Schema({
  name: String,
  author: mongoose.Types.ObjectId,
  flag: String,
  categories: [String],
  description: String,
  solves: [mongoose.Types.ObjectId],
  points: Number,
});

interface IChallenge extends Document {
  name: string,
  author: mongoose.Types.ObjectId,
  flag: string,
  categories: string[],
  description: string,
  solves: {
    playerId: mongoose.Types.ObjectId,
    timestamp: Date,
  }[],
  points: number,
}

const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);

export { Challenge, IChallenge };
