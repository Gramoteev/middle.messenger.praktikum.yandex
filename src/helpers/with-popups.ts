import {BlockClass, StoreEvents} from 'core';

export enum PopupNames {
  isPopupOpen = 'isPopupOpen',
  isAddChatUserOpen = 'isAddChatUserOpen',
  isDeleteChatUserOpen = 'isDeleteChatUserOpen'
}
export type PopupName = PopupNames.isPopupOpen | PopupNames.isAddChatUserOpen | PopupNames.isDeleteChatUserOpen;

type WithPopups = {
    isPopupOpen: boolean;
    isAddChatUserOpen?: boolean;
    isDeleteChatUserOpen?: boolean;
}

export function withPopups<P extends WithPopups>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props,
        isPopupOpen: window.store.getState().isPopupOpen,
        isAddChatUserOpen: window.store.getState().isAddChatUserOpen,
        isDeleteChatUserOpen: window.store.getState().isDeleteChatUserOpen,
      });
    }

    __onChangePopupCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.isPopupOpen !== nextState.isPopupOpen) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isPopupOpen: nextState.isPopupOpen });
      }
      if (prevState.isAddChatUserOpen !== nextState.isAddChatUserOpen) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isAddChatUserOpen: nextState.isAddChatUserOpen });
      }
      if (prevState.isDeleteChatUserOpen !== nextState.isDeleteChatUserOpen) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, isDeleteChatUserOpen: nextState.isDeleteChatUserOpen });
      }
    }

    componentDidMount() {
      super.componentDidMount();
      window.store.on(StoreEvents.Updated, this.__onChangePopupCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangePopupCallback);
    }
  } as BlockClass<Omit<P, PopupName>>;
}
