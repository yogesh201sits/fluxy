import { createStore } from "../core/createStore";
import type { StateCreator, StoreApi } from "../core/types";
import { useStore } from "./useStore";

type UseBoundStore<T> = {
  (): T;
} & StoreApi<T>;

export function create<T>(initializer: StateCreator<T>): UseBoundStore<T> {
  const store = createStore(initializer);

  const useBoundStore = () => useStore(store);

  Object.assign(useBoundStore, store);

  return useBoundStore as UseBoundStore<T>;
}