import {defaultState} from './store';
import {registerComponent, Router, Store, StoreEvents} from 'core';

import 'styles/style.pcss';
import * as components from 'components';
import {initRouter} from './router';
import {initApp} from './controllers/init-app';

require('babel-core/register');


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
});
