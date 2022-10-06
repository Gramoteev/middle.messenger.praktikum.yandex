import Block from 'core/block';

import './button.pcss';

interface ButtonProps {
  text: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
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
