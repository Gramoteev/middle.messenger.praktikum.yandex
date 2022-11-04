import {Block, Router, Store} from 'core';

import './profile.pcss';
import {getFormData, isValidFormData, Paths, withRouter, withStore, withUser} from 'helpers';
import {logout} from '../../controllers/auth';
import {changeProfile} from '../../controllers/user';

type ProfilePageProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  formError?: () => string | null;
  onNavigateNext?: (e: Event) => void;
  onSubmitProfile?: (e: Event) => void;
  onSubmitPassword?: (e: Event) => void;
  onChangeData?: (e: Event) => void;
  onChangePassword?: (e: Event) => void;
  onBack?: (e: Event) => void;
  onLogout?: (e: Event) => void;
  isReadonlyData?: boolean;
  isChangingPassword?: boolean;
};

class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';
  constructor(props: ProfilePageProps) {
    super(props);

    this.setProps({
      isReadonlyData: true,
      isChangingPassword: false,
      formError: () => this.props.store.getState().changeProfileFormError,
      onBack: (e: Event) => {
        e.preventDefault();
        return this.props.router.go(Paths.Chat)
      },
      onChangeData: (e: Event) => {
        e.preventDefault();
        this.props.isReadonlyData = false;
      },
      onChangePassword: (e: Event) => {
        e.preventDefault();
        this.props.isChangingPassword = true;
      },
      onLogout: (e: Event) => {
        e.preventDefault();
        return this.props.store.dispatch(logout)
      },
      onSubmitProfile: (e: Event) => {
        const formIsValid = isValidFormData(e, this.refs);
        if (formIsValid) {
          this.props.store.dispatch(changeProfile, getFormData(this.element!.querySelector('.profile__data')));
          this.props.isReadonlyData = true;
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
    {{#Layout type="profile"}}
      <div class="profile">
        <div class="profile__header">
            {{{EditAvatar }}}
        </div>
        <div class="profile__password" style="display: ${this.props.isChangingPassword ? 'block' : 'none'}">
            {{{ChangePassword }}}
        </div>
        <div class="profile__data" style=" display: ${this.props.isChangingPassword ? 'none' : 'block'}">
          <form>
            {{{ProfileField
                    ref="email"
                    onInput=onInput
                    onFocus=onFocus
                    type="email"
                    name="email"
                    label="Email"
                    placeholder=" "
                    value=user.email
                    readonly=isReadonlyData
            }}}
            {{{ProfileField
                    ref="login"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="login"
                    label="Login"
                    placeholder=" "
                    value=user.login
                    readonly=isReadonlyData
            }}}
            {{{ProfileField
                    ref="first_name"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="first_name"
                    label="First name"
                    placeholder=" "
                    value=user.firstName
                    readonly=isReadonlyData
            }}}
            {{{ProfileField
                    ref="second_name"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="second_name"
                    label="Second name"
                    placehlder=" "
                    value=user.secondName
                    readonly=isReadonlyData
            }}}
              {{{ProfileField
                      ref="display_name"
                      onInput=onInput
                      onFocus=onFocus
                      type="text"
                      name="display_name"
                      label="Display name"
                      placeholder=" "
                      value=user.displayName
                      readonly=isReadonlyData
              }}}
            {{{ProfileField
                    ref="phone"
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder=" "
                    value=user.phone
                    readonly=isReadonlyData
            }}}
            <div class="profile__errors">
                {{{Error class="error_common" text=formError }}}
            </div>
            <div class="profile__save" style="display: ${this.props.isReadonlyData ? 'none' : 'flex'}">
                {{{Button  text="Save" type="submit" onClick=onSubmitProfile}}}
            </div>
          </form>
        </div>
        <div class="profile__footer">
            <div class="profile__menu" style="display: ${this.props.isReadonlyData && !this.props.isChangingPassword ? 'block': 'none'}">
                <div class="profile__menu-link">
                    {{{Link text="Change data" to="/" onClick=onChangeData}}}
                </div>
                <div class="profile__menu-link">
                    {{{Link text="Change password" to="/" onClick=onChangePassword}}}
                </div>
                <div class="profile__menu-link">
                    {{{Link class="text-danger" text="Logout" to="/"  onClick=onLogout}}}
                </div>
            </div>
        </div>
      </div>
      {{#ButtonIcon style="layout-back" circle=true type="button" onClick=onBack }}
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
              <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
          </svg>
      {{/ButtonIcon}}
  {{/Layout}}
    `;
  }
}
export default withRouter(withStore(withUser(ProfilePage)));
