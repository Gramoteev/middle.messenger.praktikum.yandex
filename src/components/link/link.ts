import Block from 'core/block';

import './link.css';

type LinkProps = {
  text: string;
  to: string;
}

export class Link extends Block {
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
