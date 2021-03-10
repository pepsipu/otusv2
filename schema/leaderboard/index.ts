/* things to implement:
* TODO loadLeaderboard():
*   load the leaderboard into the redis sortedset. we'd need to load every user and their pp
* TODO updateUser(user_id, new_pp):
*   user changes pp and scoreboard needs to be updated with new ranks */

import redis, { RedisClient } from 'redis';
import { Types } from 'mongoose';
import { IUser, User } from '../user';

export default class RedisScoreboard {
  private scoreboard: RedisClient;

  constructor(scoreboard: RedisClient) {
    this.scoreboard = scoreboard;
    this.loadLeaderboard();
  }

  async loadLeaderboard() {
    /* this isn't good. mapping the array takes O(n) time, so if there was a way during mongos
    fetch that would be better, but i don't know it */
    const users = await User.find({}, 'ctf.pp');
    if (users.length) {
      this.scoreboard.zadd('scoreboard', ...users.map(
        ({ ctf: { pp }, _id: id }: IUser) => [pp, id.toString()] as any,
      ));
    }
  }

  async getRank(id: Types.ObjectId | string) {
    return new Promise(
      (resolve) => this.scoreboard.zrank(
        'scoreboard',
        id.toString(),
        (_, rank) => resolve(rank),
      ),
    );
  }

  async getRankRange(start: number, stop: number) {
    return new Promise(
      (resolve) => {
        this.scoreboard.zrange('scoreboard', start, stop, (_, users) => resolve(users));
      },
    );
  }

  close() {
    this.scoreboard.quit();
  }
}
