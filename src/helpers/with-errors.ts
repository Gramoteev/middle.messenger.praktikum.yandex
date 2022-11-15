import {BlockClass, StoreEvents} from 'core';

export enum ErrorNames {
  changePasswordFormError = 'changePasswordFormError',
}
export type ErrorName = `${ErrorNames}`;

type WithErrors = {
    changePasswordFormError: boolean;
}

export function withErrors<P extends WithErrors>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props,
        changePasswordFormError: window.store.getState().changePasswordFormError,
      });
    }

    __onChangePopupCallback = (prevState: AppState, nextState: AppState) => {
      if (prevState.changePasswordFormError !== nextState.changePasswordFormError) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, changePasswordFormError: nextState.changePasswordFormError });
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
  } as BlockClass<Omit<P, ErrorName>>;
}
