import request from 'supertest';
import { genUser, testApp } from '../util';

const session = require('supertest-session');

const [setupApp, stopApp, getApp] = testApp();
beforeAll(setupApp);
afterAll(stopApp);

describe('register user', () => {
  test('rejects bad email', async () => {
    const app = getApp();
    const user = genUser();
    user.email = 'not-email';
    const response = await request(app)
      .post('/api/user/register')
      .send(user);
    expect(response.status).toBe(400);
  });
  let registerSession: any;
  test('register user successfully', async () => {
    registerSession = session(getApp());
    const response = await registerSession
      .post('/api/user/register')
      .send(genUser());
    expect(response.status).toBe(200);
  });
});
