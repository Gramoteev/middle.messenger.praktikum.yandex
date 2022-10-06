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

require("babel-core/register");

registerComponent(Button);
registerComponent(Link);
registerComponent(AuthField);
registerComponent(ProfileField);
registerComponent(Layout);
registerComponent(ErrorComponent);
registerComponent(Label);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new ProfilePage());
});

const pagesMap = {
  registration: RegistrationPage,
  profile: ProfilePage,
  signIn: SignInPage
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.className === 'mfd-menu__button') {
    // @ts-ignore
    renderDOM(new pagesMap[target.value]);
  }
})



