import type {Dispatch} from 'core';
import {apiHasError, Paths, transformUser} from 'helpers';
import {UserDTO} from 'api/types';
import {authAPI} from 'api';

type SignInPayload = {
  login: string;
  password: string;
};

type SignUpPayload = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const signUp = async (dispatch: Dispatch<AppState>, state: AppState, action: SignUpPayload) => {
  try {
  dispatch({ isLoading: true });

  const response = await authAPI.signUp(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, signUpFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, signUpFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go(Paths.Chat);
  }catch (e){
    console.error(e)
  }
};

export const signIn = async (dispatch: Dispatch<AppState>, state: AppState, action: SignInPayload) => {
  try {
  dispatch({ isLoading: true });

  const response = await authAPI.signIn(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, signInFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, signInFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go(Paths.Chat);
  }catch (e){
    console.error(e)
  }
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go(Paths.SignIn);
  }catch (e){
    console.error(e)
  }
};
