import {Block, Store, StoreEvents} from 'core';
import './chat-input.pcss';
import {sendMessage} from 'controllers/chat';

type ChatInputProps = {
  onSubmit?: (e: Event) => void;
  onInput?: (e: InputEvent) => void;
  onFocus?: (e: Event) => void;
  onKeypress?: (e: KeyboardEvent) => void;
  store: Store<AppState>;
  events: object;
}

export class ChatInput extends Block<ChatInputProps> {
  static componentName = 'ChatInput';
  constructor(props: ChatInputProps) {
    super(props);

    this.setProps({
      onKeypress: (event: KeyboardEvent) => {
        if(event.key === 'Enter' && !event.shiftKey){
          const form = document.querySelector('form') as HTMLFormElement;
          form.dispatchEvent(new Event('submit', {cancelable: true}));
          event.preventDefault();
        }
      },
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          let isValid = true;
          const element = this.refs.message.element as HTMLTextAreaElement;
          if (element.value.length === 0) {
            isValid = false;
          }
          if (isValid) {
            window.store.dispatch(sendMessage, element.value);
          }
          element.value = '';
          window.store.on(StoreEvents.Updated, () => {
            const chat = document.querySelector(`.chat__messages`);
            if (chat) {
              chat.scrollTop = chat.scrollHeight;
            }
          });
        }
      }
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <form class="{{class}} chat-input">
            {{#ButtonIcon type="button" onClick=onChatSettings class="chat-input__attach" }}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="#999999"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="#999999"/>
                </svg>
            {{/ButtonIcon}}
            {{{Textarea
                    class="chat-input__text"
                    name="message"
                    placeholder="Message"
                    ref="message"
                    rows="1"
                    onFocus=onFocus
                    onInput=onInput
                    onKeypress=onKeypress
            }}}
            {{#ButtonIcon type="submit" circle=true}}
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5.19995" width="11" height="1.6" fill="white"/>
                    <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
                </svg>
            {{/ButtonIcon}}
        </form>
    `
  }

}
export default ChatInput;
