import Handlebars from 'handlebars';
import {nanoid} from 'nanoid';
import {EventBus} from 'core';
import mergeDeep from 'helpers/merge-deep';

type Events = Values<typeof Block.EVENTS>;
export type BlockRefs = {
  [key: string]: Block<{}>
}

export interface BlockClass<P> extends Function {
  new (props: P): Block<{}>;
  componentName?: string;
}

export default class Block<P extends Indexed> {
  static componentName: string;
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: {[id: string]: Block<{}>} = {};

  eventBus: EventBus<Events>;

  refs: BlockRefs = {};

  public constructor(props?: P) {
    this.eventBus = new EventBus<Events>();

    this.props = this._makePropsProxy(props || {} as P);


    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }



  private _createResources() {
    this._element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this._checkInDom();
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {}
  componentWillUnmount() {}

  private _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }
    this.eventBus.emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  private _componentWillUnmount() {
    this.eventBus.destroy();
    this.componentWillUnmount();
  }


  private _componentDidUpdate(oldProps: P, newProps: P) {
    const propsDidUpdate = this.componentDidUpdate(oldProps, newProps);
    if (!propsDidUpdate) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    this.children = {};
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
          this.eventBus.emit(Block.EVENTS.FLOW_CDM, this.props);
        }
      }, 100)
    }
    return this.element!;
  }

  private _makePropsProxy(props: any): any {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        target[prop] = value;

        this.eventBus.emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }


    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = this.props.events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.props,
      children: this.children,
      refs:
      this.refs
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChildren = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const slotContent = content.querySelector('[data-slot="1"]') as HTMLDivElement;

      if (slotContent && stubChildren.length) {
        slotContent.append(...stubChildren);
      }
    });

    return fragment.content;
  }


  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
