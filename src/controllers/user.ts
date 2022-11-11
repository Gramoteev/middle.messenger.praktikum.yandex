import {apiHasError, Paths, transformUser} from 'helpers';
import {UserDTO} from 'api/types';
import {userAPI} from 'api';
import {DispatchArgs} from '../core/store';

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

export const changeProfile = async (args: DispatchArgs<AppState, ChangeProfilePayload>) => {
  try{
  const {dispatch, action} = args;
  dispatch({ isLoading: true });

  const response = await userAPI.changeProfile(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changeProfileFormError: response.reason });
    return;
  }
  dispatch({isLoading: false, changeProfileFormError: null, user: transformUser(response as UserDTO) });
  } catch (e) {
    console.error(e);
  }
};

export const changePassword = async (args: DispatchArgs<AppState, ChangePasswordPayload>) => {
  try{
  const {dispatch, action} = args;
  dispatch({ isLoading: true });

  const response = await userAPI.changePassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changePasswordFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, changePasswordFormError: null, isChangingPassword: false });
  window.router.go(Paths.Profile);
  } catch (e) {
    console.error(e);
  }
};

export const uploadAvatar = async (args: DispatchArgs<AppState, FormData>) => {
  try{
  const {dispatch, action} = args;
  dispatch({ isLoading: true });

  const response = await userAPI.avatar(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changeAvatarFormError: response.reason });
    return;
  }

  dispatch({ user: transformUser(response as UserDTO), isLoading: false, isPopupOpen: false, changeAvatarFormError: null });
  } catch (e) {
    console.error(e);
  }
};
