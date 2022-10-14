import {Block} from 'core';

import './message.pcss';

type MessageProps = {
  title?: string;
  content?: string;
}

export class Message extends Block {
  static componentName = 'Message';
  constructor(props: MessageProps) {
    super({...props,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <li class="message message_{{type}}">
            <div class="message__title">{{title}}</div>
            <div class="message__content">{{content}}</div>
            <div class="message__footer">
                <time class="message-date">{{date}}</time>
            </div>
        </li>
    `
  }
}
