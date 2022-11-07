import {DialogDTO, UserDTO} from 'api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
export const transformDialog = (data: DialogDTO): Dialog => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage: {
      user: {
        firstName: data.last_message.user.first_name,
        secondName: data.last_message.user.second_name,
        avatar: data.last_message.user.avatar,
        email: data.last_message.user.email,
        login: data.last_message.user.login,
        phone: data.last_message.user.phone,
      },
      time: data.last_message.time,
      content: data.last_message.content,
    }
  };
};
