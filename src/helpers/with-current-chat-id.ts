import {BlockClass, StoreEvents} from 'core';

type WithCurrentChatIdProps = { currentChatId: number | null };

export function withCurrentChatId<P extends WithCurrentChatIdProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, currentChatId: window.store.getState().currentChatId });
    }

    __onChangeCurrentChatIdCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.currentChatId !== nextState.currentChatId) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, currentChatId: nextState.currentChatId });
      }
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(StoreEvents.Updated, this.__onChangeCurrentChatIdCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.__onChangeCurrentChatIdCallback);
    }

  } as BlockClass<Omit<P, 'currentChatId'>>;
}
