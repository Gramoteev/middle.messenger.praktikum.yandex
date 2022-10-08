import Block from 'core/block';

import './button.pcss';

type ButtonProps = {
  text: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';
  constructor({text, type, onClick}: ButtonProps) {
    super({text, type, events: {click: onClick}});
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
