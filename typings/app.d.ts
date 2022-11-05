import {Screens} from 'helpers';
import {Store, Router} from 'core';
import {DialogDTO, MessageDTO} from '../src/api/types';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  interface Window {
    store: Store<AppState>;
    router: Router;
  }
  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    isPopupOpen: boolean;
    signInFormError: string | null;
    signUpFormError: string | null;
    changeProfileFormError: string | null;
    changePasswordFormError: string | null;
    deleteChatUserFormError: string | null;
    changeAvatarFormError: string | null;
    addChatUserFormError: string | null;
    addChatFormError: string | null;
    isChangingPassword: boolean
    user: User | null;
    messages: MessageDTO[] | null
    dialogs: DialogDTO[] | null;
    currentChatId: number | null;
  };

  export type Dialog = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: {
      user: {
        firstName: string;
        secondName: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
    }
  }

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export {}
