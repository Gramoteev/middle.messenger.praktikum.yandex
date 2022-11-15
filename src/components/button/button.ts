import {Block} from 'core';
import './button.pcss';

type ButtonProps = {
  text: string;
  type: string;
  onSubmit?: () => void;
  onClick?: () => void;
  events: Indexed;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';
  constructor({onSubmit, onClick, ...props}: ButtonProps) {
    super(props);
    // const buttonEvents = {};
    // if (this.props.onSubmit) {
    //   buttonEvents.submit =
    // }

    this.setProps({
      events: {submit: onSubmit, click: onClick}
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
