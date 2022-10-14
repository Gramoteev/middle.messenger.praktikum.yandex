import {registerComponent, renderDOM} from 'core';

import 'styles/style.pcss';

import Link from 'components/link';
import Label from 'components/label';
import Button from 'components/button';
import ButtonIcon from 'components/button-icon';
import Textarea from 'components/textarea';
import Input from 'components/input';
import ChatInput from 'components/chat-input';
import Layout from 'components/layout';
import ErrorComponent from 'components/error';
import AuthField from 'components/auth-field';
import ProfileField from 'components/profile-field';
import Dialog from 'components/dialog';
import Message from 'components/message';

import ChatPage from './pages/chat';
import SignInPage from 'pages/sign-in';
import ProfilePage from 'pages/profile';
import RegistrationPage from 'pages/registration';
import ChangePasswordPage from './pages/change-password';


registerComponent(Button);
registerComponent(ButtonIcon);
registerComponent(Link);
registerComponent(AuthField);
registerComponent(ProfileField);
registerComponent(ChatInput);
registerComponent(Layout);
registerComponent(ErrorComponent);
registerComponent(Label);
registerComponent(Input);
registerComponent(Textarea);
registerComponent(Dialog);
registerComponent(Message);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new RegistrationPage());
});

const pagesMap = {
  registration: RegistrationPage,
  profile: ProfilePage,
  changePassword: ChangePasswordPage,
  chat: ChatPage,
  signIn: SignInPage
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.className === 'mfd-menu__button') {
    // @ts-ignore
    renderDOM(new pagesMap[target.value]);
  }
})



