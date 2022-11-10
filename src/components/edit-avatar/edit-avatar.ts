import {Block} from 'core';
import './edit-avatar.pcss';
import {getAvatar, getFormData, withPopups, withUser} from 'helpers';
import {uploadAvatar} from 'controllers/user';
import closePopup from 'helpers/close-popup';


type EditAvatarProps = {
  user: User | null;
  isLoading?: boolean;
  events?: Indexed;
  formError?: () => string | null;
  onOpenPopup?: (e: InputEvent) => void;
  onSubmit?: (e: Event) => void;
  isPopupOpen?: boolean;
}

class EditAvatar extends Block<EditAvatarProps> {
  static componentName = 'EditAvatar';
  constructor(props: EditAvatarProps) {
    super(props);
    this.setProps({
      formError: () => window.store.getState().changeAvatarFormError,
      onSubmit: (e: Event) => {
        e.preventDefault();
        window.store.dispatch(uploadAvatar, getFormData(this.element, true));
      },
      onOpenPopup: (e: Event) => {
        e.preventDefault();
        window.store.dispatch({isPopupOpen: true})
        this.render();
      },
      events: {
        click: closePopup('isPopupOpen' )
      }
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div>
              {{#Popup}}
                  <form class="edit-avatar" name="form-edit-avatar">
                      <h2>Upload your avatar</h2>
                      <input id="avatar" class="edit-avatar__input" type="file" name="avatar" accept="image/*">
                      <div class="profile__errors">
                          {{{Error class="error_common" text=formError }}}
                      </div>
                      {{{Button text="Upload" type="submit" onClick=onSubmit}}}
                  </form>
              {{/Popup}}
            <div class="profile__avatar" style='background-image: url(${getAvatar(this.props.user)})'>
              {{{Link class="profile__avatar__text" text="Change avatar" to="/"  onClick=onOpenPopup}}}
            </div>
        </div>
    `;
  }
}
export default withPopups(withUser(EditAvatar));
