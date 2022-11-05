import {Block, Router, Store} from 'core';
import {getFormData, isValidFormData, withRouter} from 'helpers';
import {changePassword} from '../../controllers/user';

type ChangePasswordProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  formError?: () => string | null;
  onSubmitPassword?: (e: InputEvent) => void;
}

class ChangePassword extends Block<ChangePasswordProps> {
  static componentName = 'ChangePassword';
  constructor(props: ChangePasswordProps) {
    super(props);

    this.setProps({
      formError: () => window.store.getState().changePasswordFormError,
      onSubmitPassword: (e: Event) => {
        const formIsValid = isValidFormData(e, this.refs);
        if (formIsValid) {
          let test = getFormData(this.element)
          window.store.dispatch(changePassword, test);
        }
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <div>
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
              {{{Error class="error_common" text=formError }}}
          </div>
          <div class="profile__save">
              {{{Button  text="Save" type="submit" onClick=onSubmitPassword}}}
          </div>
      </form>
      </div>
    `;
  }
}
export default withRouter(ChangePassword);
