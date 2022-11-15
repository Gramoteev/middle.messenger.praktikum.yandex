import {authAPI} from 'api';
import {UserDTO} from 'api/types';
import {apiHasError, transformUser} from 'helpers';
import {DispatchArgs} from '../core/store';

export async function initApp(args: DispatchArgs<AppState>) {
  const {dispatch} = args;
  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
