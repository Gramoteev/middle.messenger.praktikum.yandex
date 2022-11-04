import {Block, Router, Store} from 'core';

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
      isPopupOpen: false,
      events: {
        click: (e: Event) => {
          if (e.target.classList[0] === 'popup') {
            this.props.isPopupOpen = false;
          }
        }
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `

            <div class="popup {{#if isPopupOpen}}popup_hidden{{/if}}">
              <div class="popup__content" data-slot=1></div>
            </div>
    `
  }
}
export default Popup;
