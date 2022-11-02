import type {Dispatch} from 'core';
import {apiHasError, Paths, transformUser} from 'helpers';
import {UserDTO} from 'api/types';
import {chatAPI} from 'api'

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

type getChatPayload = {
  offset?: string;
  limit?: string;
  title?: string;
};

export const getDialogs = async (dispatch: Dispatch<AppState>, state: AppState, action: getChatPayload) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.request(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({isLoading: false, dialogDTOs: response });
};

export const changePassword = async (dispatch: Dispatch<AppState>, state: AppState, action: ChangePasswordPayload) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.changePassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changePasswordFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, changePasswordFormError: null });
  window.router.go(Paths.Profile);
};

export const uploadAvatar = async (dispatch: Dispatch<AppState>, state: AppState, data: FormData) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.avatar(data);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changeAvatarFormError: response.reason });
    return;
  }

  dispatch({ user: transformUser(response as UserDTO), isLoading: false, isPopupOpen: false, changeAvatarFormError: null });

};
