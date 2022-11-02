import {BlockClass, StoreEvents} from 'core';
import {isEqual} from './index';
import {DialogDTO} from '../api/types';

type WithDialogsProps = { dialogDTOs: DialogDTO[] | null };

export function withDialogs<P extends WithDialogsProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, dialogDTOs: window.store.getState().dialogDTOs });
    }

    __onChangeDialogsCallback = (prevState: AppState, nextState: AppState) => {
      if (!isEqual(prevState.dialogDTOs, nextState.dialogDTOs)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, dialogDTOs: nextState.dialogDTOs });
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

  } as BlockClass<Omit<P, 'dialogDTOs'>>;
}
