import { BlockClass } from 'core';

type WithPopup = {
  isPopupOpen: boolean;
}

/**
 * HOC не подписан на изменения стора, поэтому будет корректно работать
 * только при обернутом withStore хоке.
 */
export function withPopup<P extends WithPopup>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, isPopupOpen: () => window.store.getState().isPopupOpen });
    }
  } as BlockClass<Omit<P, 'isPopupOpen'>>;
}
