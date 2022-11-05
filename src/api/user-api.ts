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
    const response = (await this.profileAPIInstance.put('/profile', data)).response;
    return JSON.parse(response);
  }
  async avatar(data: FormData): Promise<ChangeAvatarResponseData> {
    const response = (await this.profileAPIInstance.put('/profile/avatar', data, {})).response;
    return JSON.parse(response);
  }

  async changePassword(data: ChangePasswordRequestData): Promise<ChangePasswordResponseData> {
    const response = (await this.profileAPIInstance.put('/password', data)).response;
    if (response === 'OK') {
      return {};
    }
    return JSON.parse(response);
  }
  async searchUser(login: string): Promise<UserDTO[] | APIError>  {
    return JSON.parse((await this.profileAPIInstance.post('/search', {login: login})).response);
  }

  async getUser(id: number): Promise<UserDTO | APIError>  {
    return JSON.parse((await this.profileAPIInstance.get(`/${id}`)).response);
  }

}
export default new UserAPI();
