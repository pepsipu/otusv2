import { string, object, array } from 'joi';
import { Challenge, IChallenge } from './challenge';

const createChallengeSchema = object({
  name: string().required(),
  flag: string().required(),
  categories: array().items(string().required()).required(),
  description: string().required(),
  captcha: string().required(),
});

const createChallenge = async ({
  name, author, flag, categories, description,
}: IChallenge): Promise<IChallenge> => {
  const challenge = new Challenge({
    name,
    author,
    flag,
    categories,
    description,
    solves: [],
    points: -1,
  });
  await challenge.save();
  return challenge;
};

export { createChallenge, createChallengeSchema };
