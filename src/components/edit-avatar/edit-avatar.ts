import {Block, Router, Store} from 'core';
import './edit-avatar.pcss';
import {getAvatar, getFormData, withPopup, withRouter, withStore, withUser} from 'helpers';
import {uploadAvatar} from '../../controllers/user';


type EditAvatarProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  isPopupOpen: boolean,
  events: Indexed;
  formError?: () => string | null;
  onOpenPopup?: (e: InputEvent) => void;
  onSubmit?: (e: Event) => void;
}

class EditAvatar extends Block<EditAvatarProps> {
  static componentName = 'EditAvatar';
  constructor(props: EditAvatarProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().changeAvatarFormError,
      onSubmit: (e: Event) => {
        e.preventDefault();
        this.props.store.dispatch(uploadAvatar, getFormData(this.element, true));
      },
      onOpenPopup: (e: Event) => {
        e.preventDefault();
        this.props.store.dispatch({isPopupOpen: true});
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div>
          {{#if isPopupOpen}}
            {{#Popup}}
                <form class="edit-avatar" name="form-edit-avatar">
                    <h2>Upload your avatar</h2>
<!--                    <label for="avatar" class="edit-avatar__upload">-->
<!--                        <i class="fa fa-cloud-upload"></i> Select file<br> from computer-->
<!--                    </label>-->
                    <input id="avatar" class="edit-avatar__input" type="file" name="avatar" accept="image/*">
                    <div class="profile__errors">
                        {{{Error class="error_common" text=formError }}}
                    </div>
                    {{{Button text="Upload" type="submit" onClick=onSubmit}}}
                </form>
            {{/Popup}}
          {{/if}}
            <div class="profile__avatar" style='background-image: url(${getAvatar(this.props.user)})'>
              {{{Link class="profile__avatar__text" text="Change
              avatar" to="/"  onClick=onOpenPopup}}}
            </div>
        </div>
    `;
  }
}
export default withRouter(withStore(withUser(withPopup(EditAvatar))));
