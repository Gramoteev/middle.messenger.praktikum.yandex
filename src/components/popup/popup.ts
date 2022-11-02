import {Block, Router, Store} from 'core';
import {withIsLoading, withPopup, withRouter, withStore, withUser} from 'helpers';

import './popup.pcss';
type PopupProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  isPopupOpen: boolean;
  formError?: () => string | null;
  onSubmitPassword?: (e: InputEvent) => void;
  isChangingPassword?: boolean;
  events?: Indexed;
}

class Popup extends Block<PopupProps> {
  static componentName = 'Popup';
  constructor(props: PopupProps) {
    super(props);

    this.setProps({
      events: {
        click: (e: Event) => {
          if (e.target.classList[0] === 'popup') {
            this.props.store.dispatch({isPopupOpen: false});
            return;
          }
        }
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="popup">
          <div class="popup__content" data-slot=1></div>
      </div>
    `
  }
}
export default withRouter(withStore(withUser(withIsLoading(withPopup(Popup)))));
