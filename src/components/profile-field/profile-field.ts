import Block from 'core/block';

import './profile-field.pcss';

import {validateFormElement} from "../../helpers/validate-form";

interface ProfileFieldProps {
  onInput?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  name?: string;
  label?: string;
  error?: string;
}

export class ProfileField extends Block {
  constructor(props: ProfileFieldProps) {
    super({...props,
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
      <div class="profile-field">
        <div class="profile-field__row">
              {{{Label
                      class="profile-field__label"
                      label="{{label}}"
                      name="{{name}}"
              }}}
              {{{Input
                      class="profile-field__input"
                      name="{{name}}"
                      type="{{type}}"
                      placeholder="{{placeholder}}"
                      onFocus=onFocus
                      onInput=onInput
                      onBlur=onBlur
              }}}
        </div>
        {{{Error
                ref="errorRef"
                class="profile-field__error"
                text=""
        }}}
      </div>
    `
  }
}
