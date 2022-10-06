import {Block} from "../core";

export enum ValidateName {
  Login = 'login',
  Password = 'password'
}

export function validateFormElement(element: HTMLInputElement): string {
  const name: string = element.name;
  const value: string = element.value;
  let errorMessage = '';

    if(name === ValidateName.Login) {
      if (value.length === 0) {
        errorMessage = 'Login can not be empty';
      } else if (value.length < 4) {
        errorMessage = 'Login should contains more than 3 letters';
      }
    }
    if(name === ValidateName.Password) {
      if (value.length === 0) {
        errorMessage = 'Password can not be empty';
      } else if (value.length < 7) {
        errorMessage = 'Password should contains more than 6 symbols';
      }
    }
  return errorMessage;
}
