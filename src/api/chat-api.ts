import {BaseAPI} from './base-api';
import HTTPTransport from '../core/HTTP-transport';
import {APIError, DialogDTO} from './types';

type getChatsRequest = {
  offset?: string;
  limit?: string;
  title?: string;
};

type getChatsResponseData = DialogDTO[] | APIError;

class ChatAPI extends BaseAPI {
  chatAPIInstance = new HTTPTransport('/chats');
  async create() {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return this.chatAPIInstance.post('/', {title: 'string'});
  }

  async request(data: getChatsRequest):Promise<getChatsResponseData> {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    const response = (await this.chatAPIInstance.get('/', data)).response;
    return JSON.parse(response);
  }
}
export default new ChatAPI();
