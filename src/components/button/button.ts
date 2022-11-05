import {Block} from 'core';
import './button.pcss';

type ButtonProps = {
  text: string;
  type: string;
  onClick?: () => void;
  events: Indexed;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';
  constructor({onClick, ...props}: ButtonProps) {
    super(props);
    this.setProps({
      events: {click: onClick}
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button button_{{#if style}}{{style}}{{else}}default{{/if}}"
                type="{{type}}">{{text}}
        </button>
    `;
  }
}
