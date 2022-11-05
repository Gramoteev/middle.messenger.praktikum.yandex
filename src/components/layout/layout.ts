import {Block, Router, Store} from 'core';

import './layout.pcss';

type LayoutProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
};

export default class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';
    constructor(props: LayoutProps) {
    super(props);
  }
  protected render(): string {
    // language=hbs
    return `
        <div class="layout-{{type}} ">
          <div class="layout-{{type}}__content" data-slot=1></div>
        </div>
    `
  }
}
