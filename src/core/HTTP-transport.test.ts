import {HTTPTransport} from './index';

describe('core/HTTPTransport', () => {
  const http = new HTTPTransport();
  it('should return cookie error', async () => {
    await http.get('/auth/user', {}).then(({response}) => {
      const error = JSON.parse(response).reason;
      expect(error).toBe('Cookie is not valid')
    })
      .catch((error) => {
        expect(error).toBe(null);
        throw new Error();
      });
  });

  it('should return login error', async () => {
    await http.post('/auth/signin', {
      login: 'doremi',
      password: 'nonono'
    }).then(({response}) => {
      const error = JSON.parse(response).reason;
      expect(error).toBe('Login or password is incorrect')
    })
      .catch((error) => {
        expect(error).toBe(null);
        throw new Error();
      });
  });

  it('should login', async () => {
    await http.post('/auth/signin', {
      login: 'doremi',
      password: 'doremI78'
    }).then(({status, response}) => {
          expect(status).toBe(200);
          expect(response).toBe('OK')
        })
        .catch((error) => {
          expect(error).toBe(null);
          throw new Error();
        });
  });
  it('should return user info', async () => {
    await http.post('/auth/signin', {
      login: 'doremi',
      password: 'doremI78'
    }).then(() => {})
      .catch((error) => {
        expect(error).toBe(null);
        throw new Error();
      });
    await http.get('/user/10').then(({response}) => {
      const userId = JSON.parse(response).id;
      expect(userId).toBe(10);
    })
  });
})
