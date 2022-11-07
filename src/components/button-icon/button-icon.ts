import {Block} from 'core';

import './button-icon.pcss';

type ButtonIconProps = {
  type: string;
  style: string;
  onClick?: () => void;
  events: object;
}

export class ButtonIcon extends Block<ButtonIconProps> {
  static componentName = 'ButtonIcon';
  constructor({onClick, ...props}: ButtonIconProps) {
    super(props);
    this.setProps({
      events: {click: onClick}
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button {{#if style}}{{style}}{{else}}button-icon{{/if}} type="{{type}}">
            <div class="icon {{#if circle}}icon_circle{{/if}} " data-slot=1></div>
        </button>
    `;
  }
}
