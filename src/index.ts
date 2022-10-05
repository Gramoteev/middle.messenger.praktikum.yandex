import LoginPage from "./pages/login";
require("babel-core/register");
import { Block, renderDOM, registerComponent }  from './core';

import './styles/style.pcss';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import SignInPage from "./pages/signin";

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new LoginPage());
});

const pagesMap = {
  signIn: SignInPage,
  login: LoginPage
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.tagName === 'BUTTON') {
    // @ts-ignore
    renderDOM(new pagesMap[target.value]);
  }
})



