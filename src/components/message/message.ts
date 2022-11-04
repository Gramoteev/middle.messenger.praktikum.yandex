import {Block, Store} from 'core';

import './message.pcss';
import {withStore, withUser} from '../../helpers';
import {getDate} from '../../helpers/get-date';

type MessageProps = {
  content: string;
  time: string;
  userId: number,
  user: User | null;
  store: Store<AppState>;
}

class Message extends Block<MessageProps> {
  static componentName = 'Message';
  constructor(props: MessageProps) {
    super(props);
  }
  author(userId: number) {
    return userId === this.props.user?.id ? 'own' : 'incoming';
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

export default withStore(withUser(Message));
