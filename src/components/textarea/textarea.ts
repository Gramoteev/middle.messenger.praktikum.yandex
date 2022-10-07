import Block from 'core/block';

interface InputProps {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  name?: string;
  rows?: string;
}

export class Textarea extends Block {
  constructor({onBlur, onInput, onFocus, ...props}: InputProps) {
    super({...props, events: {input: onInput, focus: onFocus, blur: onBlur}});
  }

  protected render(): string {
    // language=hbs
    return `
      <textarea class="textarea {{class}}" id="{{name}}" name="{{name}}" rows="{{rows}}" placeholder="{{placeholder}}"></textarea>
    `
  }
}
