import { BlockClass } from 'core';
import ProfilePage from 'pages/profile';
import SignInPage from 'pages/sign-in';
import SignUpPage from 'pages/sign-up';
import ErrorPage from 'pages/error';
import ChatPage from 'pages/chat';

export enum Screens {
  SignUp = 'sign-up',
  SignIn = 'sign-in',
  Profile = 'profile',
  Chat = 'chat',
  Error = 'error',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.SignUp]: SignUpPage,
  [Screens.Chat]: ChatPage,
  [Screens.SignIn]: SignInPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Error]: ErrorPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
