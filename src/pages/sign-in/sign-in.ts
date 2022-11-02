import {Block, Router, Store} from 'core';
import {getFormData, isValidFormData, Paths, withIsLoading, withRouter, withStore, withUser} from 'helpers';
import {signIn} from '../../controllers/auth';

type SignInPageProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  formError?: () => string | null;
  onNavigateNext?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
};

export class SignInPage extends Block<SignInPageProps> {
  static componentName = 'SignInPage';
  constructor(props: SignInPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().signInFormError,
      onNavigateNext: (e: Event) => this.onNavigateNext(e),
      onSubmit: (e: Event) => {
        const formIsValid = isValidFormData(e, this.refs);
        if (formIsValid) {
          this.props.store.dispatch(signIn, getFormData(this.element));
        }
      }
    });
  }
  onNavigateNext(e: Event) {
    e.preventDefault();
    if (this.props.store.getState().user?.id) {
      this.props.router.go(Paths.Chat);
    } else {
      this.props.router.go(Paths.SignUp);
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
                {{{Error class="error_common" text=formError }}}
                {{{Button text="Sign in" type="submit" onClick=onSubmit}}}
                {{{Link class="auth-form__footer-link" text="Sign Up" to="${Paths.SignUp}" onClick=onNavigateNext}}}
            </div>
        </form>
    {{/Layout}}
    `;
  }
}
export default withRouter(withStore(withIsLoading(withUser(SignInPage))));
