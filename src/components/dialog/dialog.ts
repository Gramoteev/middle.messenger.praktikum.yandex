import {Block} from 'core';

import './dialog.pcss';

type DialogProps = {
  title?: string;
  date?: string;
  text?: string;
  unread?: string;
}

export class Dialog extends Block {
  static componentName = 'Dialog';
  constructor(props: DialogProps) {
    super({...props,
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <li class="dialog">
            <img class="avatar dialog__avatar-img" src="https://pickaface.net/gallery/avatar/20140911_184056_617_demo.png" alt="Avatar">
            <div class="dialog__inner">
                <div class="dialog__top">
                    <div class="dialog__title">{{title}}</div>
                    <div class="dialog__date text-muted">{{date}}</div>
                </div>
                <div class="dialog__bottom">
                    <div class="dialog__text text-muted">{{text}}</div>
                    <div class="dialog__unread">
                        <div class="text-circle">
                            {{unread}}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `
  }
}
