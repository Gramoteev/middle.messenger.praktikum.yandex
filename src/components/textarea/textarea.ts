import {Block} from 'core';

type InputProps = {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  events: Indexed;
  name?: string;
  rows?: string;
}

export class Textarea extends Block<InputProps> {
  static componentName = 'Textarea';
  constructor({onBlur, onInput, onFocus, ...props}: InputProps) {
    super(props);
    this.setProps({
      events: {input: onInput, focus: onFocus, blur: onBlur}
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <textarea class="textarea {{class}}" id="{{name}}" name="{{name}}" rows="{{rows}}" placeholder="{{placeholder}}"></textarea>
    `
  }
}
