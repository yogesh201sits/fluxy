import { createStore } from "../core/createStore";
import { useStore } from "./useStore";

export function create<T>(initialState: T) {
  
  const store = createStore(initialState);
  
  function useBoundStore() {
    return useStore(store);
  }

  useBoundStore.getState = store.getState;
  useBoundStore.setState = store.setState;
  useBoundStore.subscribe = store.subscribe;

  return useBoundStore;

}