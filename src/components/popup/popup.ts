import {Block} from 'core';

import './popup.pcss';
import {withPopups} from 'helpers';
import closePopup from 'helpers/close-popup';
import {PopupNames} from 'helpers/with-popups';

type PopupProps = {
  isLoading: boolean;
  isPopupOpen: boolean;
  formError?: () => string | null;
  onSubmitPassword?: (e: InputEvent) => void;
  isChangingPassword?: boolean;
  events?: Indexed;
  onSubmit?: () => void;
}

class Popup extends Block<PopupProps> {
  static componentName = 'Popup';
  constructor({onSubmit, ...props}: PopupProps) {
    super(props);

    this.setProps({
      events: {
        click: closePopup( PopupNames.isPopupOpen ),
        submit: onSubmit
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
          <form class="popup__content">
              <div data-slot=1></div>
          </form>
      </div>
    `
  }
}
export default withPopups(Popup);
