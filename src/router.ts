import {getScreenComponent, Paths, Screens} from 'helpers';
import {renderDOM, Router, Store, StoreEvents} from 'core';

const routes = [
  {
    path: Paths.Chat,
    block: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: Paths.SignUp,
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: Paths.SignIn,
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: Paths.Profile,
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Error,
    shouldAuthorized: false,
  },
];

export function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        window.router.go(Paths.SignIn);
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on(StoreEvents.Updated, (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
