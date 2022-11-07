import {Block} from 'core';

type LinkProps = {
  text: string;
  to: string;
  onClick?: () => void;
  events: Indexed;
}

export class Link extends Block<LinkProps> {
  static componentName = 'Link';
  constructor({onClick, ...props}: LinkProps) {
    super(props);
    this.setProps({
      events: {click: onClick}
    });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{to}}">{{text}}</a>`;
  }
}
