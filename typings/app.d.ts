import {Screens} from 'helpers';
import {Store, Router} from 'core';
import {DialogDTO} from '../src/api/types';

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
    changeAvatarFormError: string | null;
    user: User | null;
    dialogDTOs: DialogDTO[] | null;
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
