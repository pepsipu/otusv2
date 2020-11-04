import mongoose, { Document } from 'mongoose';
import { createHash } from 'crypto';

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

const createChallenge = async (challengeData: IChallenge): Promise<IChallenge> => {
  const {
    name, author, flag, categories, description,
  } = challengeData;
  const challenge = new Challenge({
    name,
    author,
    flag,
    categories,
    description,
    solves: [],
    points: -1,
  });
  challenge.publicId = createHash('sha1').update(challenge.id).digest('hex');
  await challenge.save();
  return challenge;
};

export { createChallenge, Challenge, IChallenge };
