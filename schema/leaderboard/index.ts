/* things to implement:
* TODO updateUser(user_id, new_pp):
*   user changes pp and scoreboard needs to be updated with new ranks */

import { RedisClient } from 'redis';
import { Types } from 'mongoose';
import { IUser, User } from '../user';

export default class RedisScoreboard {
  private scoreboard: RedisClient;

  constructor(scoreboard: RedisClient) {
    this.scoreboard = scoreboard;
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    /* this isn't good. mapping the array takes O(n) time, so if there was a way during mongos
    fetch that would be better, but i don't know it */
    User.find({}, 'ctf.pp').then(((users) => {
      if (users.length) {
        users.forEach(({ ctf: { pp }, _id: id }: IUser) => {
          this.scoreboard.zadd('scoreboard', pp, id.toString());
        });
      }
    }));
  }

  async addUser(id: Types.ObjectId | string) {
    this.scoreboard.zadd('scoreboard', 0, id.toString());
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
