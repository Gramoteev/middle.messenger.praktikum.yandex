import {Block} from 'core';

import './auth-field.pcss';
import validateFormElement from 'helpers/validate-form';

type AuthFieldProps = {
  onInput?: (e: InputEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  name?: string;
  label?: string;
  error?: string;
}

export class AuthField extends Block<AuthFieldProps> {
  static componentName = 'AuthField';
  constructor(props: AuthFieldProps) {
    super(props);
    this.setProps({
      onInput: (e: InputEvent) => {
        const element = e.target as HTMLInputElement;
        const errorMessage = validateFormElement(element);
        this.refs.errorRef.setProps({text: errorMessage});
      },
      onFocus: (e: FocusEvent) => {
        const element = e.target as HTMLInputElement;
        const errorMessage = validateFormElement(element);
        this.refs.errorRef.setProps({text: errorMessage});
      },
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;

        const error = validateFormElement(inputEl)

        this.refs.errorRef.setProps({
          text: error
        });
      }
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="auth-field">
          {{{Input
            class="auth-field__input"
            name="{{name}}"
            type="{{type}}"
            placeholder="{{placeholder}}"
            onFocus=onFocus
            onInput=onInput
            onBlur=onBlur
          }}}
          {{{Label
            class="auth-field__label"
            label="{{label}}"
            name="{{name}}"
          }}}
          {{{Error
                  ref="errorRef"
                  class="auth-field__error"
                  text=""
          }}}
      </div>
    `
  }
}
