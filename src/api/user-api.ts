import {APIError, UserDTO} from './types';
import HTTPTransport from 'core/HTTP-transport';

type ChangePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

type ChangeProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type ChangePasswordResponseData = Record<string, never> | APIError;

type ChangeAvatarResponseData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;

} | APIError;

type ChangeProfileResponseData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;

} | APIError;

class UserAPI {
  profileAPIInstance = new HTTPTransport('/user');

  async changeProfile(data: ChangeProfileRequestData): Promise<ChangeProfileResponseData> {
   try {
     const response = (await this.profileAPIInstance.put('/profile', data)).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }
  async avatar(data: FormData): Promise<ChangeAvatarResponseData> {
   try {
     const response = (await this.profileAPIInstance.put('/profile/avatar', data, {})).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

  async changePassword(data: ChangePasswordRequestData): Promise<ChangePasswordResponseData> {
    try {
    const response = (await this.profileAPIInstance.put('/password', data)).response;
    if (response === 'OK') {
      return {};
    }
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }
  async searchUser(login: string): Promise<UserDTO[] | APIError>  {
    try {
    const response = (await this.profileAPIInstance.post('/search', {login: login})).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

  async getUser(id: number): Promise<UserDTO | APIError>  {
    try {
    const response = (await this.profileAPIInstance.get(`/${id}`)).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

}
export default new UserAPI();
