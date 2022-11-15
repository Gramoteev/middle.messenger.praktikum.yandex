import {Block, Store} from 'core';

import './message.pcss';
import {getDate} from 'helpers/get-date';

type MessageProps = {
  content: string;
  time: string;
  userId: number,
  user: User | null;
  store: Store<AppState>;
  currentUserId: number | null;
}

class Message extends Block<MessageProps> {
  static componentName = 'Message';
  constructor(props: MessageProps) {
    super(props);
  }

  author(userId: number): 'own' | 'incoming' {
    return userId === this.props.currentUserId ? 'own' : 'incoming';
  }

  protected render(): string {
    const date = getDate(this.props.time);
    // language=hbs
    return `
        <li class="message message_${this.author(this.props.userId)}">
            <div class="message__content">{{content}}</div>
            <div class="message__footer">
                <time class="message-date">${date.hour}:${date.minute}</time>
            </div>
        </li>
    `
  }
}

export default Message;
