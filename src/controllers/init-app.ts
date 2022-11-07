import {authAPI} from 'api';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'helpers';

export async function initApp(dispatch: Dispatch<AppState>) {

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
