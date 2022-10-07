import Block from 'core/block';

import './message.pcss';

interface MessageProps {
  title?: string;
  content?: string;
}

export class Message extends Block {
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
                <div class="message-date">{{date}}</div>
            </div>
        </li>
    `
  }
}
