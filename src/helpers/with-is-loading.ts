import {BlockClass, StoreEvents} from 'core';

type WithIsLoading = {
  isLoading: boolean;
}

export function withIsLoading<P extends WithIsLoading>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isLoading: window.store.getState().isLoading });
    }

    __onChangeIsLoadingCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.isLoading !== nextState.isLoading) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isLoading: nextState.isLoading });
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.Updated, this.__onChangeIsLoadingCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeIsLoadingCallback);
    }
  } as BlockClass<Omit<P, 'isLoading'>>;
}
