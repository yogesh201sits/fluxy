import { ListenerCollection } from "./listener";
import type { StoreApi, Listener, StateCreator } from "./types";

export function createStore<T>(initializer: StateCreator<T>): StoreApi<T> {
  let state!: T;

  const listeners = new ListenerCollection<T>();

  function getState(): T {
    return state;
  }

  function setState(partial: Partial<T> | ((state: T) => Partial<T>)): void {
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

  function subscribe(listener: Listener<T>) {
    return listeners.subscribe(listener);
  }

  // Initialize the store state
  state = initializer(setState, getState);

  return {
    getState,
    setState,
    subscribe,
  };
}