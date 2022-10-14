import {Block} from 'core';
import validateFormElement from 'helpers/validate-form';

export class ChangePasswordPage extends Block {
  static componentName = 'ChangePasswordPage';
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
    {{#Layout type="profile" back-btn="enabled"}}
      <form class="profile">
        <div class="profile__header">
          <button class="edit-avatar" style='background-image: url("https://pickaface.net/gallery/avatar/20140911_184056_617_demo.png")'>
            <span class="edit-avatar__text">Change<br>avatar</span>
          </button>
        </div>
        <div class="profile__content">
          <div class="profile__data">
              {{{ProfileField
                      ref="oldPassword"
                      onInput=onInput
                      onFocus=onFocus
                      type="password"
                      name="oldPassword"
                      label="Old password"
                      placeholder=" "
              }}}
              {{{ProfileField
                      ref="newPassword"
                      onInput=onInput
                      onFocus=onFocus
                      type="password"
                      name="newPassword"
                      label="New password"
                      placeholder=" "
              }}}
            {{{ProfileField
                    ref="repeatNewPassword"
                    onInput=onInput
                    onFocus=onFocus
                    type="password"
                    name="repeatNewPassword"
                    label="Repeat new password"
                    placeholder=" "
            }}}
          </div>
          <div class="profile__footer">
            <div class="profile__save">
                {{{Button  text="Save" type="submit" onClick=onSubmit}}}
            </div>
          </div>
        </div>
      </form>
  {{/Layout}}
    `;
  }
}
