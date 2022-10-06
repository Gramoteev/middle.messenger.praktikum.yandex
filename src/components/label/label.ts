import Block from 'core/block';

interface LabelProps {
  label?: string;
  class?: string;
  name?: string;
}

export class Label extends Block<LabelProps> {
  protected render(): string {
    // language=hbs
    return `
        <label class="label {{class}}" for="{{name}}">{{label}}</label>
    `
  }
}
