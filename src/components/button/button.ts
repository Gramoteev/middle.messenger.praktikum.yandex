import Block from 'core/Block';

import './button.pcss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="auth-form__submit" type="button">{{text}}</button>
    `;
  }
}
