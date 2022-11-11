import {apiHasError} from 'helpers';
import {chatAPI, userAPI} from 'api'
import messagesController from './messages';
import {UpdateChatUsersRequest} from '../api/chat-api';
import {DispatchArgs} from '../core/store';

type GetChatPayload = {
  offset?: string;
  limit?: string;
  title?: string;
};
type AddChatPayload = {
  title?: string;
};

export const deleteChatUser = async (args: DispatchArgs<AppState, string>) => {
  const {dispatch, state, action} = args;

  try {
  dispatch({ isLoading: true });

  const findUser =  await userAPI.searchUser(action);
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
  }catch (e){
    console.error(e)
  }
};

export const addChatUser = async (args: DispatchArgs<AppState, string>) => {
  const {dispatch, state, action} = args;
  try {
  dispatch({ isLoading: true });

  const findUser =  await userAPI.searchUser(action);
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
  }catch (e){
    console.error(e)
  }
};


export const addChat = async (args: DispatchArgs<AppState, AddChatPayload>) => {
  const {dispatch, action} = args;
  try {
  dispatch({ isLoading: true });

  const response = await chatAPI.create(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, addChatFormError: response.reason });
    return;
  }
  dispatch({isPopupOpen: false});
  dispatch(getDialogs);
  }catch (e){
    console.error(e)
  }
};


export const getDialogs = async (args: DispatchArgs<AppState, GetChatPayload>) => {
  const {dispatch, action} = args;
  try {
  dispatch({ isLoading: true });

  const response = await chatAPI.request(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({isLoading: false, dialogs: response });
  }catch (e){
    console.error(e)
  }
};

export const sendMessage = async (args: DispatchArgs<AppState, string>) => {
  const {action} = args;
  messagesController.sendMessage(action);
};

export const getCurrentDialog = async (args: DispatchArgs<AppState, number>) => {
  const {dispatch, state, action} = args;
  try {
  dispatch({currentChatId: action, isLoading: true, messages: null});

  const response = await chatAPI.getToken(action);


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

  messagesController.connect(userId, action, token);
  dispatch({ isLoading: false });
  }catch (e){
    console.error(e)
  }
};
