import {Block} from 'core';

type LinkProps = {
  text: string;
  to: string;
  onClick: () => void;
}

export class Link extends Block {
  static componentName = 'Link';
  constructor({onClick, ...props}: LinkProps) {
    super({...props, events: { click: onClick }});
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{to}}">{{text}}</a>`;
  }
}
