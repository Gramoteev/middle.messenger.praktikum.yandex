import {BlockClass, StoreEvents} from 'core';
import {isEqual} from './index';
import {DialogDTO} from '../api/types';

type WithDialogsProps = { dialogs: DialogDTO[] | null };

export function withDialogs<P extends WithDialogsProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, dialogs: window.store.getState().dialogs });
    }

    __onChangeDialogsCallback = (prevState: AppState, nextState: AppState) => {
      if (!isEqual(prevState.dialogs, nextState.dialogs)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, dialogs: nextState.dialogs });
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.Updated, this.__onChangeDialogsCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeDialogsCallback);
    }

  } as BlockClass<Omit<P, 'dialogs'>>;
}
