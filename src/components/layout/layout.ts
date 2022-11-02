import {Block, Router, Store} from 'core';

import './layout.pcss';
import {withIsLoading, withRouter, withStore} from 'helpers';

type LayoutProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
};

class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';
    constructor(props: LayoutProps) {
    super(props);
  }
  protected render(): string {
    // language=hbs
    return `
        <div class="layout-{{type}} ">
          <div class="{{#if isLoading}}layout_loading{{/if}}"></div>
          <div class="layout-{{type}}__content" data-slot=1></div>
        </div>
    `
  }
}
export default withRouter(withStore(withIsLoading(Layout)));

