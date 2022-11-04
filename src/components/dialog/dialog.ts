import {Block, Router, Store} from 'core';

import './dialog.pcss';
import {getAvatar, withRouter, withStore} from 'helpers';
import {getCurrentDialog} from '../../controllers/chat';

type DialogProps = {
  router: Router;
  store: Store<AppState>;
  title?: string;
  date?: string;
  text?: string;
  unread?: string;
  events?: Indexed;
}

class Dialog extends Block<DialogProps> {
  static componentName = 'Dialog';
  constructor(props: DialogProps) {
    super(props);

    this.setProps({
      events: {
        click: (e: Event) => {
          window.store.dispatch(getCurrentDialog, e.currentTarget?.id);
        }
      }
    })
  }

  protected render(): string {
    // language=hbs
    return `
        <li id="{{id}}" class="dialog">
            <img class="avatar dialog__avatar-img" src=${getAvatar(null)} alt="Avatar">
            <div class="dialog__inner">
                <div class="dialog__top">
                    <div class="dialog__title">{{title}}</div>
                    <time class="dialog__date text-muted">{{time}}</time>
                </div>
                <div class="dialog__bottom">
                    <div class="dialog__text text-muted">{{content}}</div>
                    {{#if unreadCount}}
                        <div class="dialog__unread">
                            <div class="text-circle">
                                {{unreadCount}}
                            </div>
                        </div>
                    {{/if}}
                </div>
            </div>
        </li>
    `
  }
}
export default withRouter(withStore(Dialog));
