/* things to implement:
* TODO loadLeaderboard():
*   load the leaderboard into the redis sortedset. we'd need to load every user and their pp
* TODO updateUser(user_id, new_pp):
*   user changes pp and scoreboard needs to be updated with new ranks */

import redis, { RedisClient } from 'redis';
import { Types } from 'mongoose';
import { IUser, User } from '../user';

const loadLeaderboard = async (scoreboard: RedisClient) => {
  /* this isn't good. mapping the array takes O(n) time, so if there was a way during mongos
  fetch that would be better, but i don't know it */
  const users = await User.find({}, 'ctf.pp');
  if (users.length) {
    scoreboard.zadd('scoreboard', ...users.map(
      ({ ctf: { pp }, _id: id }: IUser) => [pp, id.toString()] as any,
    ));
  }
};

const updateUser = (id: Types.ObjectId, pp: number) => {

};

// TODO: dont promisify zrank on the fly, but im lazy to add new types to the client
const getRank = async (scoreboard: RedisClient, id: Types.ObjectId | string) => new Promise(
  (resolve, reject) => scoreboard.zrank(
    'scoreboard',
    id.toString(),
    (_, rank) => resolve(rank),
  ),
);

const getRanksIndex = async (scoreboard: RedisClient) => {};

export {
  loadLeaderboard, updateUser, getRank, getRanksIndex,
};
