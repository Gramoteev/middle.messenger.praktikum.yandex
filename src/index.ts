import SignIn from "pages/sign-in";
import {registerComponent, renderDOM} from './core';

import 'styles/style.pcss';

import Button from 'components/button';
import Link from 'components/link';
import Layout from 'components/layout';
import RegistrationPage from "pages/registration";
import AuthField from "components/authField";
import ErrorComponent from "./components/error";
import Label from "./components/label";
import Input from "./components/input";

require("babel-core/register");

registerComponent(Button);
registerComponent(Link);
registerComponent(AuthField);
registerComponent(Layout);
registerComponent(ErrorComponent);
registerComponent(Label);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new SignIn());
});

const pagesMap = {
  signIn: RegistrationPage,
  login: SignIn
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.className === 'mfd-menu__button') {
    // @ts-ignore
    renderDOM(new pagesMap[target.value]);
  }
})



