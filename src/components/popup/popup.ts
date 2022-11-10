import {Block} from 'core';

import './popup.pcss';
import {withPopups} from 'helpers';
import closePopup from '../../helpers/close-popup';

type PopupProps = {
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
        click: closePopup('isPopupOpen' )
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="popup {{#if isPopupOpen}}{{else}}popup_hidden{{/if}}">
              <div class="popup__content" data-slot=1></div>
            </div>
    `
  }
}
export default withPopups(Popup);
