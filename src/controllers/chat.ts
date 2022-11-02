import type {Dispatch} from 'core';
import {apiHasError} from 'helpers';
import {chatAPI} from 'api'

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

