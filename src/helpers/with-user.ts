import {BlockClass, StoreEvents} from 'core';
import {isEqual} from './index';

type WithUserProps = { user: User | null };

export function withUser<P extends WithUserProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, user: window.store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (!isEqual(prevState.user, nextState.user)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, user: nextState.user });
      }
    }

    componentDidMount() {
      super.componentDidMount();
      window.store.on(StoreEvents.Updated, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeUserCallback);
    }

  } as BlockClass<Omit<P, 'user'>>;
}
