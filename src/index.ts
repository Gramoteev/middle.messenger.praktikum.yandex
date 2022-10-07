import SignInPage from "pages/sign-in";
import {registerComponent, renderDOM} from 'core';

import 'styles/style.pcss';

import Button from 'components/button';
import Link from 'components/link';
import Layout from 'components/layout';
import RegistrationPage from "pages/registration";
import ErrorComponent from "components/error";
import Label from "components/label";
import Input from "components/input";
import ProfilePage from "pages/profile";
import AuthField from "components/auth-field";
import ProfileField from "components/profile-field";
import ChatInput from "components/chat-input";
import {ChatPage} from "pages/chat/chat";
import Textarea from "components/textarea";
import ButtonIcon from "components/button-icon";
import Dialog from "components/dialog";
import Message from "components/message";
import {ChangePasswordPage} from "pages/change-password/change-password";

require("babel-core/register");

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

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new RegistrationPage());
});

const pagesMap = {
  registration: RegistrationPage,
  profile: ProfilePage,
  changePassword: ChangePasswordPage,
  chat: ChatPage,
  signIn: SignInPage
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.className === 'mfd-menu__button') {
    // @ts-ignore
    renderDOM(new pagesMap[target.value]);
  }
})



