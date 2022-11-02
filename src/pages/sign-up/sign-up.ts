import {getFormData, isValidFormData, Paths, withRouter, withStore, withUser} from 'helpers';
import {Block, Router, Store} from 'core';
import {signUp} from '../../controllers/auth';

type SignUpPageProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  formError?: () => string | null;
  onNavigateNext?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
};

export class SignUpPage extends Block<SignUpPageProps> {
  static componentName = 'SignUpPage';
  constructor(props: SignUpPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().signUpFormError,
      onNavigateNext: (e: Event) => this.onNavigateNext(e),
      onSubmit: (e: Event) => {
        const formIsValid = isValidFormData(e, this.refs);
        if (formIsValid) {
          this.props.store.dispatch(signUp, getFormData(this.element));
        }
      }
    });
  }
  onNavigateNext(e: Event) {
    e.preventDefault();
    if (this.props.store.getState().user?.id) {
      this.props.router.go(Paths.Chat);
    } else {
      this.props.router.go(Paths.SignIn);
    }
  }

  render() {
    if (this.props.user?.id) {
      // language=hbs
      return `
        {{#Layout type="auth" }}
          <h2 class="text-center">You are already logged in</h2>
        {{{Button text="Go in app" type="submit" onClick=onNavigateNext}}}
        {{/Layout}}
      `
    }
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <form class="form auth-form">
            <div class="auth-form__content">
                <h1 class="auth-form__title">Sign Up</h1>
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
                {{{Error class="error_common" text=formError }}}
                {{{Button text="Register" type="submit" onClick=onSubmit}}}
                {{{Link class="auth-form__footer-link" text="Sign in" to="${Paths.SignIn}" onClick=onNavigateNext}}}
            </div>
        </form>
  {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withUser(SignUpPage)));
