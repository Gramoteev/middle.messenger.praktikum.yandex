import HTTPTransport from '../core/HTTP-transport';
import {APIError, DialogDTO} from './types';

type AddChatsRequest = {
  title?: string;
};
export type UpdateChatUsersRequest = {
  users: number[];
  chatId: number;
};
type GetChatsRequest = {
  offset?: string;
  limit?: string;
  title?: string;
};

type GetChatsResponseData = DialogDTO[] | APIError;
type AddChatsResponseData = Record<string, never> | APIError;
type UpdateChatUsersResponseData = Record<string, never> | APIError;
type GetTokenResponseData = Indexed | APIError;

class ChatAPI {
  chatAPIInstance = new HTTPTransport('/chats');

  async create(title?: AddChatsRequest):Promise<AddChatsResponseData>{
    try {
      const response = (await this.chatAPIInstance.post('/', title)).response;
      if (response === 'OK') {
        return {};
      }
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

  async deleteUsers(data: UpdateChatUsersRequest):Promise<UpdateChatUsersResponseData> {
     try {
     const response = (await this.chatAPIInstance.delete('/users', data)).response;
      if (response === 'OK') {
        return {};
      }
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

  async addUsers(data: UpdateChatUsersRequest):Promise<UpdateChatUsersResponseData> {
     try {
     const response = (await this.chatAPIInstance.put('/users', data)).response;
      if (response === 'OK') {
        return {};
      }
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }

  async request(data?: GetChatsRequest):Promise<GetChatsResponseData> {
     try {
     const response = (await this.chatAPIInstance.get('/', data)).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }
  async getToken(id: number):Promise<GetTokenResponseData> {
     try {
     const response = (await this.chatAPIInstance.post(`/token/${id}`)).response;
      return JSON.parse(response);
    } catch (e) {
      throw e;
    }
  }
}
export default new ChatAPI();
