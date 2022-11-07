import {Block} from 'core';

type InputProps = {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  readonly?: string;
  name?: string;
  value?: string;
  events?: Indexed;
}

export class Input extends Block<InputProps> {
  static componentName = 'Input';
  constructor({onBlur, onInput, onFocus, value, ...props}: InputProps) {
    super(props);
    this.setProps({
      value: value === '{{value}}' ? '' : value,
      events: {input: onInput, focus: onFocus, blur: onBlur}
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <input class="input {{class}}"  {{#if readonly}}readonly{{/if}} value="{{value}}" id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}">
    `
  }
}
