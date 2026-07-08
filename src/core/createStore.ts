import { ListenerCollection } from "./listener";
import type { StoreApi } from "./types";

export function createStore<T>(initialState: T): StoreApi<T> {
  let state = initialState;

  const listeners = new ListenerCollection<T>();

  function getState(): T {
    return state;
  }

  function setState(
    partial: Partial<T> | ((state: T) => Partial<T>)
  ): void {
    const partialState =
      typeof partial === "function"
        ? partial(state)
        : partial;

    state = {
      ...state,
      ...partialState,
    };

    listeners.notify(state);
  }

  function subscribe(listener: (state: T) => void) {
    return listeners.subscribe(listener);
  }

  return {
    getState,
    setState,
    subscribe,
  };
}