import Block from 'core/block';
import validateFormElement from "helpers/validate-form";

import './profile.pcss';

export class ProfilePage extends Block {
  static componentName = 'ProfilePage';
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
                    ref="email"
                    onInput=onInput
                    onFocus=onFocus
                    type="email"
                    name="email"
                    label="Email"
                    placeholder=" "
            }}}
            {{{ProfileField
                    ref="login"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="login"
                    label="Login"
                    placeholder=" "
            }}}
            {{{ProfileField
                    ref="first_name"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="first_name"
                    label="First name"
                    placeholder=" "
            }}}
            {{{ProfileField
                    ref="second_name"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="second_name"
                    label="Second name"
                    placeholder=" "
            }}}
              {{{ProfileField
                      ref="nickname"
                      onInput=onInput
                      onFocus=onFocus
                      type="text"
                      name="nickname"
                      label="Nickname"
                      placeholder=" "
              }}}
            {{{ProfileField
                    ref="phone"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder=" "
            }}}
          </div>
          <div class="profile__footer">
            <div style="display: none" " class="profile__menu">
                <div class="profile__menu-link">
                    {{{Link text="Change data" to="/"}}}
                </div>
                <div class="profile__menu-link">
                  {{{Link text="Change password" to="/"}}}
                </div>
                <div class="profile__menu-link">
                  {{{Link class="text-danger" text="Logout" to="/"}}}
                </div>
            </div>
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
