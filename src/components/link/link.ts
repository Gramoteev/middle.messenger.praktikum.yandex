import {Block} from 'core';

type LinkProps = {
  text: string;
  to: string;
}

export class Link extends Block {
  static componentName = 'Link';
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
    }

    super({...props, events: { click: onClick }});
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{to}}">{{text}}</a>`;
  }
}
