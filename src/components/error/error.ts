import {Block} from 'core';
import './error.pcss'

type ErrorProps = {
  text?: string;
  class?: string;
}

export class Error extends Block<ErrorProps> {
  static componentName = 'Error';
  protected render(): string {
    // language=hbs
    return `
        <div class='error {{class}}'>{{#if text}}{{text}}{{/if}}</div>
    `
  }
}
