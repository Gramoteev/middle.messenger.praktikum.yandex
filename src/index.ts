import {defaultState} from './store';

require('babel-core/register');

import {registerComponent, renderDOM, Router, Store, StoreEvents} from 'core';

import 'styles/style.pcss';
import * as components from'components';
import SplashPage from './pages/splash';
import {initRouter} from './router';
import {initApp} from './controllers/init-app';
import {getDialogs} from './controllers/chat';


Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  renderDOM(new SplashPage({}));

  store.on(StoreEvents.Updated, (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
  store.dispatch(getDialogs);
});
