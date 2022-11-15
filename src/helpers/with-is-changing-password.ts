import {BlockClass, StoreEvents} from 'core';

type WithIsChangingPassword = {
  isChangingPassword: boolean;
}

export function withIsChangingPassword<P extends WithIsChangingPassword>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isChangingPassword: window.store.getState().isChangingPassword });
    }

    __onChangeIsChangingPasswordCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.isChangingPassword !== nextState.isChangingPassword) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isChangingPassword: nextState.isChangingPassword });
      }
    }

    componentDidMount() {
      super.componentDidMount();
      window.store.on(StoreEvents.Updated, this.__onChangeIsChangingPasswordCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeIsChangingPasswordCallback);
    }
  } as BlockClass<Omit<P, 'isChangingPassword'>>;
}
