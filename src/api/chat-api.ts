import {BaseAPI} from './base-api';
import HTTPTransport from '../core/HTTP-transport';
import {APIError, DialogDTO} from './types';

type addChatsRequest = {
  title?: string;
};
export type updateChatUsersRequest = {
  users: number[];
  chatId: number;
};
type getChatsRequest = {
  offset?: string;
  limit?: string;
  title?: string;
};

type getChatsResponseData = DialogDTO[] | APIError;
type addChatsResponseData = Record<string, never> | APIError;
type updateChatUsersResponseData = Record<string, never> | APIError;
type getTokenResponseData = Indexed | APIError;

class ChatAPI extends BaseAPI {
  chatAPIInstance = new HTTPTransport('/chats');

  async create(title?: addChatsRequest):Promise<addChatsResponseData>{
    const response = (await this.chatAPIInstance.post('/', title)).response;
    if (response === 'OK') {
      return {};
    }
    return JSON.parse(response);
  }

  async deleteUsers(data: updateChatUsersRequest):Promise<updateChatUsersResponseData> {
    const response = (await this.chatAPIInstance.delete('/users', data)).response;
    if (response === 'OK') {
      return {};
    }
    return JSON.parse(response);
  }

  async addUsers(data: updateChatUsersRequest):Promise<updateChatUsersResponseData> {
    const response = (await this.chatAPIInstance.put('/users', data)).response;
    if (response === 'OK') {
      return {};
    }
    return JSON.parse(response);
  }

  async request(data: getChatsRequest):Promise<getChatsResponseData> {
    const response = (await this.chatAPIInstance.get('/', data)).response;
    return JSON.parse(response);
  }
  async getToken(id: number):Promise<getTokenResponseData> {
    const response = (await this.chatAPIInstance.post(`/token/${id}`)).response;
    return JSON.parse(response);
  }
}
export default new ChatAPI();
