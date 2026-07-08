import type { Listener } from "./types";

export class ListenerCollection<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify(state: T) {
    this.listeners.forEach((listener) => listener(state));
  }
  
}