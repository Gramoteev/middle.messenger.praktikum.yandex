import {Block} from 'core';

import './button-icon.pcss';

type ButtonIconProps = {
  type: string;
  style: string;
  onSubmit?: () => void;
  onClick?: () => void;
  events: object;
}

export class ButtonIcon extends Block<ButtonIconProps> {
  static componentName = 'ButtonIcon';
  constructor({onSubmit, onClick, ...props}: ButtonIconProps) {
    super(props);
    this.setProps({
      events: {submit: onSubmit, click: onClick}
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button {{#if style}}{{style}}{{else}}button-icon{{/if}}" type="{{type}}">
            <div class="icon {{#if circle}}icon_circle{{/if}} " data-slot=1></div>
        </button>
    `;
  }
}
