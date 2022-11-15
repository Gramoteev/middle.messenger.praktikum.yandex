import {Block, Router, Store} from 'core';
import {getFormData, isValidFormData, Paths, Screens, withIsLoading, withRouter, withUser} from 'helpers';
import {signIn} from 'controllers/auth';

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
      formError: () => window.store.getState().signInFormError,
      onNavigateNext: (e: Event) => this.onNavigateNext(e),
      onSubmit: (e: Event) => {
        const formIsValid = isValidFormData(e, this.refs);
        if (formIsValid) {
          window.store.dispatch(signIn, getFormData(this.element));
        }
      }
    });
  }
  onNavigateNext(e: Event) {
    e.preventDefault();
    if (window.store.getState().user?.id) {
      this.props.router.go(Paths.Chat);
    } else {
      this.props.router.go(Paths.SignUp);
    }
  }

  componentDidUpdate() {
    return window.store.getState().screen === Screens.SignIn;
  }
  render() {
    if (this.props.user?.id) {
      // language=hbs
      return `
        {{#Layout type="auth" }}
          <h2 class="text-center">You are already logged in</h2>
        {{{Button text="Go in app" type="button" onClick=onNavigateNext}}}
        {{/Layout}}
      `
    }
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <div class="{{#if isLoading}}layout_loading{{else}}''{{/if}}"></div>
        {{#Form onSubmit=onSubmit class="form auth-form"}}
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
                {{{Button text="Sign in" type="submit"}}}
                {{{Link class="auth-form__footer-link" text="Sign Up" to="${Paths.SignUp}" onClick=onNavigateNext}}}
            </div>
        {{/Form}}
    {{/Layout}}
    `;
  }
}
export default withRouter(withUser(withIsLoading(SignInPage)));
