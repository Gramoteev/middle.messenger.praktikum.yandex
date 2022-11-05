import {BlockClass, Store, StoreEvents} from 'core';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({
        ...this.props,
        store: window.store,
        messages: window.store.getState().messages,
        currentChatId: window.store.getState().currentChatId,
        isPopupOpen: window.store.getState().isPopupOpen,
        isAddChatUserOpen: window.store.getState().isPopupOpen,
        isDeleteChatUserOpen: window.store.getState().isPopupOpen,
        isChangingPassword: window.store.getState().isChangingPassword,
        isLoading: window.store.getState().isLoading

      });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}
