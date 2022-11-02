import {Block} from 'core';

import './button-icon.pcss';

type ButtonIconProps = {
  type: string;
  style: string;
  onClick?: () => void;
  events: {};
}

export class ButtonIcon extends Block<ButtonIconProps> {
  static componentName = 'ButtonIcon';
  constructor({onClick, ...props}: ButtonIconProps) {
    super({...props, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button {{#if style}}{{style}}{{else}}button_icon{{/if}} type="{{type}}">
            <div class="icon icon_circle" data-slot=1></div>
        </button>
    `;
  }
}
