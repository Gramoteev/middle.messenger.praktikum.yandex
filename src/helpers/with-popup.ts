import {BlockClass, StoreEvents} from 'core';

type WithPopup = {
  isPopupOpen: boolean;
}

export function withPopup<P extends WithPopup>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isPopupOpen: () => window.store.getState().isPopupOpen });
    }

    __onChangePopupCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.isPopupOpen !== nextState.isPopupOpen) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isPopupOpen: nextState.isPopupOpen });
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.Updated, this.__onChangePopupCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangePopupCallback);
    }
  } as BlockClass<Omit<P, 'isPopupOpen'>>;
}
