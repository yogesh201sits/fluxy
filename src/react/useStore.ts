import { useSyncExternalStore } from "react";
import type { StoreApi } from "../core/types";

export function useStore<T>(store: StoreApi<T>): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState
  );
}