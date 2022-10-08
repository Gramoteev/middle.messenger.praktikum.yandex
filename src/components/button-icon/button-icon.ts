import Block from 'core/block';

import './button-icon.pcss';

type ButtonIconProps = {
  type: string;
  onClick: () => void;
}

export class ButtonIcon extends Block {
  constructor({type, onClick}: ButtonIconProps) {
    super({type, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button button_icon" type="{{type}}">
            <div class="icon icon_circle" data-slot=1></div>
        </button>
    `;
  }
}
