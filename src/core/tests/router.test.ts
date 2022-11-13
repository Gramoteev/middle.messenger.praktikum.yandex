import Router from '../router';

describe('core/Router', () => {
  const router = new Router();
  const mock = jest.fn();
  const testUrl = '/test';
  const testUrl2 = '/test2';

  router.use(testUrl, mock ).use(testUrl2, mock)

  router.go(testUrl);
  router.go(testUrl2);

  it('is defined', () => {
    // @ts-expect-error check that object is defined
    expect(router.routes).toBeDefined();
  });

  it('correctly call next jump', () => {
    expect(mock).toBeCalledTimes(2);
  });

  it('set routes to window history', () => {
    expect(window.history.length).toEqual(3)
  });


  it('not call callback if url is wrong', () => {
    router.go('/wrong-url');
    expect(mock).toBeCalledTimes(2);
  });
});
