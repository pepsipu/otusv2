import request from 'supertest';
import { genUser, testApp } from '../util';

const session = require('supertest-session');

const [setupApp, stopApp, getApp] = testApp();
beforeAll(setupApp);
afterAll(stopApp);

const user = genUser();
let userSession: any;

describe('register user', () => {
  test('rejects bad email', async () => {
    const app = getApp();
    const badUser = genUser();
    badUser.email = 'not-email';
    const { status, body } = await request(app)
      .post('/api/user/register')
      .send({ ...badUser, captcha: 'captcha' });

    expect(body).toEqual({
      error: [
        '"email" must be a valid email',
      ],
    });
    expect(status).toBe(400);
  });
  test('register user successfully', async () => {
    userSession = session(getApp());
    const { status, body } = await userSession
      .post('/api/user/register')
      .send({ ...user, captcha: 'captcha' });

    expect(body).toEqual({ error: false });
    expect(status).toBe(200);
  });
});

describe('logout user', () => {
  test('rejects not logged in', async () => {
    const { status, body } = await request(getApp())
      .post('/api/user/logout');

    expect(body).toEqual({ error: 'not logged in' });
    expect(status).toBe(403);
  });
  test('logout user successfully', async () => {
    const { status, body } = await userSession
      .post('/api/user/logout');

    expect(body).toEqual({ error: false });
    expect(status).toBe(200);
  });
});

describe('login user', () => {
  test('rejects bad password', async () => {
    const { status, body } = await request(getApp())
      .post('/api/user/login')
      .send({ email: user.email, password: 'not_password12', captcha: 'captcha' });

    expect(body).toEqual({ error: 'passwords do not match' });
    expect(status).toBe(401);
  });
  test('log in user', async () => {
    const { username, ...userLogin } = user;
    const { status, body } = await userSession
      .post('/api/user/login')
      .send({ ...userLogin, captcha: 'captcha' });

    expect(body).toEqual({ error: false });
    expect(status).toBe(200);
  });
});

describe('user profile', () => {
  test('reject nonexistent profile', async () => {
    const { status, body } = await userSession
      .get('/api/user/profile/2e71777dff35158b955605a606c042e4ad0b3217');

    expect(body).toEqual({ error: 'user does not exist' });
    expect(status).toBe(404);
  });

  test('user profile is accurate', async () => {
    const { status, body: { error, username } } = await userSession
      .get(`/api/user/profile/${userSession.cookies.find(({ name }: any) => name === 'id').value}`);

    expect(error).toBeFalsy();
    expect(username).toBe(user.username);
    expect(status).toBe(200);
  });
});
