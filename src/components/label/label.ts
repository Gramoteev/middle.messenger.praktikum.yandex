import {Block} from 'core';

type LabelProps = {
  label?: string;
  class?: string;
  name?: string;
}

export class Label extends Block<LabelProps> {
  static componentName = 'Label';
  protected render(): string {
    // language=hbs
    return `
        <label class="label {{class}}" for="{{name}}">{{label}}</label>
    `
  }
}
