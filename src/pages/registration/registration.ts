import {validateFormElement} from 'helpers';
import {Block} from 'core';

export class RegistrationPage extends Block {
  static componentName = 'RegistrationPage';
  constructor() {
    super();

    this.setProps({
      onSubmit: (e: Event) => {
        e.preventDefault();

        let isValid = true;
        Object.entries(this.refs).forEach(([name, field]) => {
          const element = field.element?.querySelector(`#${name}`) as HTMLInputElement;
          const errorMessage = validateFormElement(element);
          this.refs[element.id].refs.errorRef.setProps({text: errorMessage});
          if (errorMessage) {
            isValid = false;
          }
        });
        if (isValid) {
          const form = this.element?.querySelector('form') as HTMLFormElement;
          const formData = new FormData(form);
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }
        }
      }
    });
  }

  render() {
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <form class="form auth-form">
            <div class="auth-form__content">
                <h1 class="auth-form__title">Registration</h1>
                {{{AuthField
                        ref="email"
                        onInput=onInput
                        onFocus=onFocus
                        type="email"
                        name="email"
                        label="Email"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="login"
                        onInput=onInput
                        onFocus=onFocus
                        type="text"
                        name="login"
                        label="Login"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="first_name"
                        onInput=onInput
                        onFocus=onFocus
                        type="text"
                        name="first_name"
                        label="First name"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="second_name"
                        onInput=onInput
                        onFocus=onFocus
                        type="text"
                        name="second_name"
                        label="Second name"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="phone"
                        onInput=onInput
                        onFocus=onFocus
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="password"
                        onInput=onInput
                        onFocus=onFocus
                        type="password"
                        name="password"
                        label="Password"
                        placeholder=" "
                }}}
            </div>
            <div class="auth-form__footer">
                {{{Button text="Register" type="submit" onClick=onSubmit}}}
                {{{Link class="auth-form__footer-link" text="Sign in" to="/"}}}
            </div>
        </form>
  {{/Layout}}
    `;
  }
}
