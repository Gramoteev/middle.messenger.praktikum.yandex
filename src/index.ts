import SignIn from "./pages/sign-in";
require("babel-core/register");
import { Block, renderDOM, registerComponent }  from './core';

import './styles/style.pcss';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import RegistrationPage from "./pages/registration";

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);

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



