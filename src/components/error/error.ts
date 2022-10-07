import Block from 'core/block';

import './error.pcss'

interface ErrorProps {
  text?: string;
  class?: string;
}

export class Error extends Block<ErrorProps> {
  protected render(): string {
    // language=hbs
    return `
        <div class="error {{class}}">{{#if text}}{{text}}{{/if}}</div>
    `
  }
}