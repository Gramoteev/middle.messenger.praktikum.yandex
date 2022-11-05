import type { Dispatch } from 'core';
import {apiHasError, Paths, transformUser} from 'helpers';
import {UserDTO} from 'api/types';
import {userAPI} from 'api';

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

type ChangeProfilePayload = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export const changeProfile = async (dispatch: Dispatch<AppState>, state: AppState, action: ChangeProfilePayload) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changeProfile(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changeProfileFormError: response.reason });
    return;
  }
  dispatch({isLoading: false, changeProfileFormError: null, user: transformUser(response as UserDTO) });
};

export const changePassword = async (dispatch: Dispatch<AppState>, state: AppState, action: ChangePasswordPayload) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changePassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changePasswordFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, changePasswordFormError: null, isChangingPassword: false });
  window.router.go(Paths.Profile);
};

export const uploadAvatar = async (dispatch: Dispatch<AppState>, state: AppState, data: FormData) => {
  dispatch({ isLoading: true });

  const response = await userAPI.avatar(data);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changeAvatarFormError: response.reason });
    return;
  }

  dispatch({ user: transformUser(response as UserDTO), isLoading: false, isPopupOpen: false, changeAvatarFormError: null });

};
