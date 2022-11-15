import {Block} from 'core';

type TextareaProps = {
  onInput?: () => void;
  onFocus?: () => void;
  onKeypress?: () => void;
  placeholder?: string;
  events: Indexed;
  name?: string;
  rows?: string;
}

export class Textarea extends Block<TextareaProps> {
  static componentName = 'Textarea';
  constructor({onInput, onKeypress, onFocus, ...props}: TextareaProps) {
    super(props);
    this.setProps({
      events: {input: onInput, focus: onFocus, keypress: onKeypress}
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <textarea class="textarea {{class}}" id="{{name}}" name="{{name}}" rows="{{rows}}" placeholder="{{placeholder}}"></textarea>
    `
  }
}
