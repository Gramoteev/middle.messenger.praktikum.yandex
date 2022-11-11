import {EventBus} from 'core';

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | DispatchAction<State>,
  payload?: any,
) => void;

export type DispatchAction<State> = ( args: DispatchArgs<State>) => void;

export type DispatchArgs<State, Action = any> = {
  dispatch: Dispatch<State>,
  state: State,
  action: Action,
}

export enum StoreEvents {
  Updated = 'updated',
}

export default class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | DispatchAction<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction({
        dispatch: this.dispatch.bind(this),
        state: this.state,
        action: payload
      });
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
