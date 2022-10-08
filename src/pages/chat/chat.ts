import Block from 'core/block';
import './chat.pcss';
// const messagesData = [
//   { "id": 123, "user_id": 231, "chat_id": 312, "time": "2020-01-02T14:22:22.000Z", "content": "Hello!"},
//   { "id": 123, "user_id": 231, "chat_id": 312, "time": "2020-01-02T14:22:22.000Z", "content": ""},
//   ];
//
export class ChatPage extends Block {
  static componentName = 'ChatPage';
  constructor() {
    super();

    this.setProps({
    });
  }

  render() {
    // language=hbs
    return `
    {{#Layout type="main" }}
        <main class="chat">
            <div class="chat__aside aside">
                <div class="aside-header">
                    <h2 class="text-muted aside-header__link">
                        Profile
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="#999999"/>
                        </svg>

                    </h2>
                    <div class="aside-search">
                        <input type="text" id="aside-search-input" placeholder=" " class="clean-input aside-search__input">
                        <label for="aside-search-input" class="text-muted aside-search__label">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5924 11.4138C10.1605 12.8457 7.83886 12.8457 6.40694 11.4138C4.97502 9.9819 4.97502 7.6603 6.40694 6.22837C7.83886 4.79645 10.1605 4.79645 11.5924 6.22837C13.0243 7.6603 13.0243 9.9819 11.5924 11.4138ZM12.0328 12.7968C10.0725 14.2962 7.25696 14.1495 5.46413 12.3566C3.51151 10.404 3.51151 7.23819 5.46413 5.28556C7.41675 3.33294 10.5826 3.33294 12.5352 5.28556C14.3279 7.07831 14.4747 9.89373 12.9755 11.8539L16.5423 15.4206L15.5994 16.3635L12.0328 12.7968Z" fill="#999999"/>
                            </svg>
                            Search
                        </label>
                    </div>
                </div>
                <ul class="aside-dialogs list custom-scroll">
                    {{{Dialog
                            title="Ivan"
                            date="St"
                            text="explain to you how all this mistaken idea of denouncing pleasure and praising pain was"
                            unread=2
                    }}}
                    {{{Dialog
                        title="Andre"
                        date="St"
                        text="explain to you how all this mistaken idea of denouncing pleasure and praising pain was"
                        unread=2
                    }}}
                </ul>
            </div>
            <div class="chat__content">
                <div class="chat__header">
                    <div class="chat-info">
                        <img class="avatar chat-info__avatar"
                             src="https://pickaface.net/gallery/avatar/20140911_184056_617_demo.png"
                             alt="Avatar">
                        <div class="chat-title">Vadim</div>
                    </div>
                    <button class="button button_icon chat-menu">
                        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                            <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                            <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                        </svg>
                    </button>
                </div>
                <div class="chat__messages list custom-scroll">
                    {{{Message
                            type="incoming"
                            date="11:59"
                            content="content"}}}
                    {{{Message
                            type="own"
                            date="14:59"
                            content="But I must explain to you how all this mistaken idea of denouncing pleasure and
                             praising pain was born and I will give you a complete account of the system, and expound
                             the actual teachings of the great explorer of the truth, the master-builder ofhuman
                             happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure"
                    }}}
                    {{{Message
                            type="own"
                            date="14:59"
                            content="But I must explain to you how all this mistaken idea of denouncing pleasure and
                             praising pain was born and I will give you a complete account of the system, and expound
                             the actual teachings of the great explorer of the truth, the master-builder ofhuman
                             happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure"
                    }}}
                    {{{Message
                            type="incoming"
                            date="11:59"
                            content="content"}}}
                    {{{Message
                            type="own"
                            date="14:59"
                            content="But I must explain to you how all this mistaken idea of denouncing pleasure and
                             praising pain was born and I will give you a complete account of the system, and expound
                             the actual teachings of the great explorer of the truth, the master-builder ofhuman
                             happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure"
                    }}}
                    {{{Message
                            type="incoming"
                            date="11:59"
                            content="content"}}}
                    {{{Message
                            type="own"
                            date="14:59"
                            content="But I must explain to you how all this mistaken idea of denouncing pleasure and
                             praising pain was born and I will give you a complete account of the system, and expound
                             the actual teachings of the great explorer of the truth, the master-builder ofhuman
                             happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure"
                    }}}
                    {{{Message
                            type="own"
                            date="14:59"
                            content="But I must explain to you how all this mistaken idea of denouncing pleasure and
                             praising pain was born and I will give you a complete account of the system, and expound
                             the actual teachings of the great explorer of the truth, the master-builder ofhuman
                             happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure"
                    }}}
                </div>
                <div class="chat__footer">
                    {{{ChatInput
                        onSubmit=onSubmit
                    }}}
                </div>
            </div>
        </main>
    {{/Layout}}
    `;
  }
}
