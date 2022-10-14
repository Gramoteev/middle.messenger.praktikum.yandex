import {Block} from 'core';
import {validateFormElement} from 'helpers';
export class SignInPage extends Block {
  static componentName = 'SignInPage';
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
        if (isValid && this.element?.querySelector('#form')) {
          const form = this.element?.querySelector('#form') as HTMLFormElement;
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
        <form id="form" class="form auth-form">
            <div class="auth-form__content">
                <h1 class="auth-form__title">Sign in</h1>
                {{{AuthField
                        ref="login"
                        type="text"
                        name="login"
                        label="Login"
                        placeholder=" "
                }}}
                {{{AuthField
                        ref="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder=" "
                }}}
            </div>
            <div class="auth-form__footer">
                {{{Button text="Sign in" type="submit" onClick=onSubmit}}}
                {{{Link class="auth-form__footer-link" text="Registration" to="/"}}}
            </div>
        </form>
    {{/Layout}}
    `;
  }
}
