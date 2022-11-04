import type {Dispatch} from 'core';
import {apiHasError, Paths} from 'helpers';
import {chatAPI, userAPI} from 'api'
import messagesController from './messages';
import {updateChatUsersRequest} from '../api/chat-api';

type getChatPayload = {
  offset?: string;
  limit?: string;
  title?: string;
};
type addChatPayload = {
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
  if (findUser.length > 1) {
    findUser = findUser.filter(user => user.login === action);
  }
  const req: updateChatUsersRequest = {users: findUser.map(user => user.id), chatId: state.currentChatId!};
  const response = await chatAPI.deleteUsers(req);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, addChatUserFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false });
  dispatch({isPopupOpen: false});
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
  if (findUser.length > 1) {
    findUser = findUser.filter(user => user.login === action);
  }
  const req: updateChatUsersRequest = {users: findUser.map(user => user.id), chatId: state.currentChatId!};
  const response = await chatAPI.addUsers(req);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, addChatUserFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false });
  dispatch({isPopupOpen: false});
};


export const addChat = async (dispatch: Dispatch<AppState>, state: AppState, action: addChatPayload) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.create(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch(getDialogs);
};


export const getDialogs = async (dispatch: Dispatch<AppState>, state: AppState, action: getChatPayload) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.request(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({isLoading: false, dialogs: response });
// TODO: Find normal way to get list of chats on the /messenger page
  window.router.go(Paths.SignIn);
  window.router.go(Paths.Chat);
};

export const sendMessage = async (dispatch: Dispatch<AppState>, state: AppState, message: string) => {
  console.log(message)
  messagesController.sendMessage(message);
};
export const getCurrentDialog = async (dispatch: Dispatch<AppState>, state: AppState, chatId: number) => {
  dispatch({ isLoading: true });
  dispatch({currentChatId: chatId});

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
};
