import { APIError, UserDTO } from './types';
import HTTPTransport from 'core/HTTP-transport';

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

type SignInResponseData = Record<string, never> | APIError;

type SignUpResponseData = Record<string, never> | APIError;

class AuthAPI {
  authAPIInstance = new HTTPTransport('/auth');

  async signUp(data: SignUpRequestData): Promise<SignUpResponseData> {
   try {
     const response = (await this.authAPIInstance.post('/signup', data)).response;
      if (response === 'OK') {
        return {};
      }
      return JSON.parse(response);

    } catch (e) {
      throw e;
    }
  }

  async signIn(data: SignInRequestData): Promise<SignInResponseData> {
   try {
     const response = (await this.authAPIInstance.post('/signin', data)).response;
      if (response === 'OK') {
        return {};
      }
      return JSON.parse(response);

    } catch (e) {
      throw e;
    }
  }

  async me(): Promise<UserDTO | APIError>  {
    return JSON.parse((await this.authAPIInstance.get('/user')).response);
    try {
      const response = (await this.authAPIInstance.get('/user')).response;
      return JSON.parse(response);

    } catch (e) {
      throw e;
    }
  }

  logout() {
    return this.authAPIInstance.post('/logout');
  }
}
export default new AuthAPI();
