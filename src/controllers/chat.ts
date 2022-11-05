import type {Dispatch} from 'core';
import {apiHasError} from 'helpers';
import {chatAPI, userAPI} from 'api'
import messagesController from './messages';
import {UpdateChatUsersRequest} from '../api/chat-api';
import {DialogDTO} from '../api/types';

type GetChatPayload = {
  offset?: string;
  limit?: string;
  title?: string;
};
type AddChatPayload = {
  title?: string;
};
export const deleteChatUser = async (dispatch: Dispatch<AppState>, state: AppState, action: string) => {
  dispatch({ isLoading: true });

  let findUser =  await userAPI.searchUser(action);
  if (apiHasError(findUser)) {
    dispatch({ isLoading: false, deleteChatUserFormError: findUser.reason });
    return;
  }
  if (findUser.length === 0) {
    dispatch({ isLoading: false, deleteChatUserFormError: 'Please use correct login' });
    return;
  }

  const certainFindUser = findUser.length > 1 ? findUser.filter(user => user.login === action) : [...findUser]

  const req: UpdateChatUsersRequest = {users: certainFindUser.map(user => user.id), chatId: state.currentChatId!};
  const response = await chatAPI.deleteUsers(req);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, addChatUserFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false });
  dispatch({isDeleteChatUserOpen: false});
};

export const addChatUser = async (dispatch: Dispatch<AppState>, state: AppState, action: string) => {
  dispatch({ isLoading: true });

  let findUser =  await userAPI.searchUser(action);
  if (apiHasError(findUser)) {
    dispatch({ isLoading: false, addChatUserFormError: findUser.reason });
    return;
  }
  if (findUser.length === 0) {
    dispatch({ isLoading: false, addChatUserFormError: 'Please use correct login' });
    return;
  }
  const certainFindUser = findUser.length > 1 ? findUser.filter(user => user.login === action) : [...findUser]
  const req: UpdateChatUsersRequest = {users: certainFindUser.map(user => user.id), chatId: state.currentChatId!};
  const response = await chatAPI.addUsers(req);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, addChatUserFormError: response.reason });
    return;
  }
  dispatch({isAddChatUserOpen: false, isLoading: false});
};


export const addChat = async (dispatch: Dispatch<AppState>, action: AddChatPayload): Promise<DialogDTO[]> => {
  dispatch({ isLoading: true });

  const response = await chatAPI.create(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  return getDialogs(dispatch);
};


export const getDialogs = async (dispatch: Dispatch<AppState>, state?: AppState, action?: GetChatPayload): Promise<DialogDTO[]> => {
  dispatch({ isLoading: true });

  const response = await chatAPI.request(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({isLoading: false });
  return response;
};

export const sendMessage = async (dispatch: Dispatch<AppState>, state: AppState, message: string) => {
  messagesController.sendMessage(message);
};
export const getCurrentDialog = async (dispatch: Dispatch<AppState>, state: AppState, chatId: number) => {
  dispatch({currentChatId: chatId, isLoading: true, messages: null});

  const response = await chatAPI.getToken(chatId);


  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  if (!state || !state.user) {
    dispatch({ isLoading: false });
    return
  }
  const userId = state.user.id;
  const token = response.token;

  messagesController.connect(userId, chatId, token);
  dispatch({ isLoading: false });
};
