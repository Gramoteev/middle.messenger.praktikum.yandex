export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type MessageDTO = {
  chat_id: number;
  content: string;
  file: null | File;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export type DialogDTO = {
  id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
    }
}
