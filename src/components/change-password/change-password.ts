import {Block, Router, Store} from 'core';
import {getFormData, isValidFormData, withRouter} from 'helpers';
import {changePassword} from 'controllers/user';
import {withErrors} from '../../helpers/with-errors';

type ChangePasswordProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  changePasswordFormError: boolean;
  events?: Indexed;
}

class ChangePassword extends Block<ChangePasswordProps> {
  static componentName = 'ChangePassword';
  constructor(props: ChangePasswordProps) {
    super(props);

    this.setProps({
      events: {
        submit:(e: Event) => {
          const formIsValid = isValidFormData(e, this.refs);
          if (formIsValid) {
            const test = getFormData(this.element)
            window.store.dispatch(changePassword, test);
          }
        }
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <form>
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
          <div class="profile__errors">
              {{{Error class="error_common" text=changePasswordFormError }}}
          </div>
          <div class="profile__save">
              {{{Button  text="Save" type="submit"}}}
          </div>
      </form>
    `;
  }
}
export default withRouter(withErrors(ChangePassword));
