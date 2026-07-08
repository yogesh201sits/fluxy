import type{ Listener, StoreApi } from "./types.ts";

export function createStore<T>(initialState: T): StoreApi<T> {
  let state = initialState;

  const listeners = new Set<Listener<T>>();

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

    listeners.forEach((listener) => {
      listener(state);
    });
  }

  function subscribe(listener: Listener<T>) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getState,
    setState,
    subscribe,
  };
}