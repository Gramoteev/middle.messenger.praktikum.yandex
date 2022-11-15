import {BlockClass, StoreEvents} from 'core';
import {MessageDTO} from '../api/types';

type WithMessagesProps = { messages: MessageDTO[] | null };

export function withMessages<P extends WithMessagesProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, messages: window.store.getState().messages });
    }

    // @ts-expect-error prevState is not typed
    __onChangeMessagesCallback = (prevState: AppState, nextState: AppState) => {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, messages: nextState.messages });
    }

    componentDidMount() {
      super.componentDidMount();
      window.store.on(StoreEvents.Updated, this.__onChangeMessagesCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeMessagesCallback);
    }

  } as BlockClass<Omit<P, 'messages'>>;
}
