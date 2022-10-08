import Block from 'core/block';

type InputProps = {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
}

export class Input extends Block {
  constructor({onBlur, onInput, onFocus, ...props}: InputProps) {
    super({...props, events: {input: onInput, focus: onFocus, blur: onBlur}});
  }

  protected render(): string {
    // language=hbs
    return `
      <input class="input {{class}}" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}">
    `
  }
}
