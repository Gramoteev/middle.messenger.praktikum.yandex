import { APIError, UserDTO } from './types';
import {HTTPTransport} from 'core';
import checkResponse from 'helpers/check-response';

type SignInRequestData = {
  login: string;
  password: string;
};

type SignUpRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

// Эти две функции возвращают пустой объект поэтому я указываю Record<string, never>
type SignInResponseData = Record<string, never> | APIError;
type SignUpResponseData = Record<string, never> | APIError;

class AuthAPI {
  authAPIInstance = new HTTPTransport('/auth');

  async signUp(data: SignUpRequestData): Promise<SignUpResponseData> {
     const response = (await this.authAPIInstance.post('/signup', data)).response;
     return checkResponse(response)
  }

  async signIn(data: SignInRequestData): Promise<SignInResponseData> {
     const response = (await this.authAPIInstance.post('/signin', data)).response;
     return checkResponse(response)
  }

  async me(): Promise<UserDTO | APIError>  {
    const response = (await this.authAPIInstance.get('/user')).response;
    return JSON.parse(response);
  }

  logout() {
    return this.authAPIInstance.post('/logout');
  }
}
export default new AuthAPI();
