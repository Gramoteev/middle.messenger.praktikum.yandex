import {Paths, withIsLoading, withRouter, withStore, withUser} from 'helpers';
import {Block, Router, Store} from 'core';

import './error.pcss';

type ErrorPageProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  onNavigateNext?: (e: Event) => void;
};

class ErrorPage extends Block<ErrorPageProps> {
  static componentName = 'Error';
  constructor(props: ErrorPageProps) {
    super(props);

    this.setProps({
      onNavigateNext: (e: Event) => this.onNavigateNext(e),
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
    // language=hbs
    return `
    {{#Layout type="auth" }}
        <div class="error-page">
            <div class="error-page__inner">
                <div class="error-page__title">404</div>
                <div class="error-page__text">PAGE NOT FOUND</div>
                {{{Link class="auth-form__footer-link" text="Go home" to="${Paths.SignIn}" onClick=onNavigateNext}}}
            </div>
        </div>
  {{/Layout}}
    `;
  }
}
export default withRouter(withStore(withUser(withIsLoading(ErrorPage))));
