import {Block, Router, Store} from 'core';
import './chat.pcss';
import {
  getFormData,
  Paths,
  Screens, validateFormElement,
  withCurrentChatId,
  withDialogs,
  withIsLoading,
  withMessages,
  withPopups,
  withRouter,
  withUser
} from 'helpers';
import {DialogDTO, MessageDTO} from 'api/types';
import {addChat, addChatUser, deleteChatUser, getDialogs} from 'controllers/chat';
import closePopup from 'helpers/close-popup';
import {PopupNames} from 'helpers/with-popups';

type ChatPageProps = {
  user: User | null;
  router: Router;
  store: Store<AppState>;
  isLoading: boolean;
  formError?: () => string | null;
  addChatFormError?: () => string | null;
  addChatUserFormError?: () => string | null;
  deleteChatUserFormError?: () => string | null;
  onNavigateProfile?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
  onAddChat?: (e: Event) => void;
  onAddChatUser?: (e: Event) => void;
  onDeleteChatUser?: (e: Event) => void;
  isPopupOpen: boolean,
  isAddChatUserOpen: boolean,
  isDeleteChatUserOpen: boolean,
  onAddChatPopup?: (e: InputEvent) => void;
  onAddChatUserPopup?: (e: InputEvent) => void;
  onDeleteChatUserPopup?: (e: InputEvent) => void;
  dialogs: DialogDTO[] | null;
  messages: MessageDTO[] | null;
  events: Indexed;
  currentChatId: number | null;
};
class ChatPage extends Block<ChatPageProps> {
  static componentName = 'ChatPage';
  constructor(props: ChatPageProps) {
    super(props);

    window.store.dispatch(getDialogs);

    this.setProps({
      addChatFormError: () => window.store.getState().addChatFormError,
      addChatUserFormError: () => window.store.getState().addChatUserFormError,
      deleteChatUserFormError: () => window.store.getState().deleteChatUserFormError,
      onNavigateProfile: (e: Event) => {
        e.preventDefault();
        this.props.router.go(Paths.Profile);
      },
      onAddChatUser: (e: Event) => {
        e.preventDefault();
        const form = this.element!.querySelector('.popup-add-user');
        const loginField = form?.querySelector('#login') as HTMLInputElement;
        const errorMessage = validateFormElement(loginField);
        errorMessage ?
          window.store.dispatch({ addChatUserFormError: errorMessage }) :
          window.store.dispatch(addChatUser, loginField.value);
      },
      onDeleteChatUser: (e: Event) => {
        e.preventDefault();
        const form = this.element!.querySelector('.popup-delete-user');
        const loginField = form?.querySelector('#login') as HTMLInputElement;
        const errorMessage = validateFormElement(loginField);
        errorMessage ?
          window.store.dispatch({ deleteChatUserFormError: errorMessage }) :
          window.store.dispatch(deleteChatUser, loginField.value);
      },
      onAddChat: (e: Event) => {
        e.preventDefault();
        window.store.dispatch(addChat, getFormData(this.element!.querySelector('.popup')));
      },
      onAddChatPopup: (e: Event) => {
        e.preventDefault();
        window.store.dispatch({isPopupOpen: true});
      },
      onAddChatUserPopup: (e: Event) => {
        e.preventDefault();
        window.store.dispatch({isAddChatUserOpen: true});
      },
      onDeleteChatUserPopup: (e: Event) => {
        e.preventDefault();
        window.store.dispatch({isDeleteChatUserOpen: true});
      },
      events: {
        click: closePopup(PopupNames.isPopupOpen, PopupNames.isAddChatUserOpen, PopupNames.isDeleteChatUserOpen )
      }
    });
  }
    componentDidUpdate() {
      return window.store.getState().screen === Screens.Chat;
    }

  render() {
    // language=hbs
    return `
    {{#Layout type="main" }}
        <div class="{{#if isLoading}}layout_loading{{else}}''{{/if}}"></div>
        <main class="chat">
            <div class="chat__aside aside">
                <div class="aside-header">
                    <div class="aside=header__add-chat">
                        {{#ButtonIcon type="button" onClick=onAddChatPopup }}
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
                          <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
                          <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5"/>
                          </svg>
                            <span class="button-icon__text">Add chat</span>
                        {{/ButtonIcon}}
                    </div>
                    <h2 class="aside-header__link">
                        {{{Link class="text-muted " text="Profile" to="${Paths.Profile}" onClick=onNavigateProfile}}}
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="#999999"/>
                        </svg>

                    </h2>
                </div>
                <div class="aside-search">
                    <input type="text" id="aside-search-input" placeholder=" " class="clean-input aside-search__input">
                    <label for="aside-search-input" class="text-muted aside-search__label">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5924 11.4138C10.1605 12.8457 7.83886 12.8457 6.40694 11.4138C4.97502 9.9819 4.97502 7.6603 6.40694 6.22837C7.83886 4.79645 10.1605 4.79645 11.5924 6.22837C13.0243 7.6603 13.0243 9.9819 11.5924 11.4138ZM12.0328 12.7968C10.0725 14.2962 7.25696 14.1495 5.46413 12.3566C3.51151 10.404 3.51151 7.23819 5.46413 5.28556C7.41675 3.33294 10.5826 3.33294 12.5352 5.28556C14.3279 7.07831 14.4747 9.89373 12.9755 11.8539L16.5423 15.4206L15.5994 16.3635L12.0328 12.7968Z" fill="#999999"/>
                        </svg>
                        Search
                    </label>
                </div>
                <ul class="aside-dialogs list custom-scroll">
                    {{#each dialogs}}
                        {{{Dialog
                                id=id
                                title=title
                                avatar=avatar
                                time=time
                                content=content
                                unreadCount=unread_count
                                currentChatId=${this.props.currentChatId}
                        }}}
                    {{/each}}
                </ul>
            </div>
            <div class="chat__content">
            {{#if currentChatId}}
                <div class="chat__header">
                    <div class="chat-info">
                    </div>
                    <label class="dropdown">
                        <div class="dd-button">
                            <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                                <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                                <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                            </svg>
                        </div>
                      <input type="checkbox" class="dd-input" id="chat-menu">
                      <ul class="dd-menu">
                          <li>
                              {{{Link text="Add user" to="/"  onClick=onAddChatUserPopup}}}
                          </li>
                          <li class="divider"></li>
                        <li>
                            {{{Link text="Delete user" to="/"  onClick=onDeleteChatUserPopup}}}
                        </li>
                      </ul>
                    </label>
                </div>
                <div class="chat__messages list custom-scroll">
                    {{#each messages}}
                        {{{Message
                                currentUserId=${this.props.user?.id}
                                userId=user_id
                                time=time
                                content=content}}}
                    {{/each}}
                </div>
                <div class="chat__footer">
                    {{{ChatInput}}}
                </div>
            {{else}}
                <div class="chat__hello">Please select chat</div>
            {{/if}}
            </div>


        </main>
        <div class="popup {{#if isPopupOpen}}{{else}}popup_hidden{{/if}}">
          {{#Popup onSubmit=onAddChat}}
            <h2 class="text-center">Add chat</h2>
            {{{AuthField
                    ref="title"
                    type="text"
                    name="title"
                    label="Chat name"
                    placeholder=" "
            }}}
            <div class="profile__errors">
                {{{Error class="error_common" text=addChatFormError }}}
            </div>
            {{{Button text="Add chat" type="submit"}}}
          {{/Popup}}
        </div>
        <div class="popup popup-delete-user {{#if isDeleteChatUserOpen}}{{else}}popup_hidden{{/if}}">
          {{#Popup onSubmit=onDeleteChatUser}}
            <h2 class="text-center">Delete user</h2>
            {{{AuthField
                    ref="login"
                    type="text"
                    name="login"
                    label="Login"
                    placeholder=" "
            }}}
            <div class="profile__errors">
                {{{Error class="error_common" text=deleteChatUserFormError }}}
            </div>
            {{{Button text="Delete user" type="submit"}}}
          {{/Popup}}
        </div>
            <div class="popup popup-add-user {{#if isAddChatUserOpen}}{{else}}popup_hidden{{/if}}">
              {{#Popup onSubmit=onAddChatUser}}
                <h2 class="text-center">Add user</h2>
                {{{AuthField
                        ref="login"
                        type="text"
                        name="login"
                        label="Login"
                        placeholder=" "
                }}}
                <div class="profile__errors">
                    {{{Error class="error_common" text=addChatUserFormError }}}
                </div>
                {{{Button text="Add user" type="submit"}}}
              {{/Popup}}
            </div>
        </div>
        </div>
    {{/Layout}}
    `;
  }
}
export default withRouter(withUser(withPopups(withCurrentChatId(withIsLoading(withDialogs(withMessages(ChatPage)))))));
